import React, { useState, useEffect, useCallback } from 'react';
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Layers,
  Phone,
  Building,
  User,
  X,
  FileText
} from 'lucide-react';
import { supabase, ProjectSubmission, ProjectFile } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from '../router';

interface EditFormState {
  project_name: string;
  project_type: string;
  project_description: string;
  expected_timeline: string;
  phone: string;
  company: string;
  client_name: string;
}

const PROJECT_TYPES = [
  'Embedded Systems & Firmware',
  'Industrial IoT & Edge Computing',
  'Custom PCB Design & Prototyping',
  'Sensors & Automation',
  'Hardware-Software Integration',
  'Other / Custom Engineering',
];

const TIMELINE_OPTIONS = [
  'Urgent (< 2 weeks)',
  'Standard (2 - 4 weeks)',
  'Extended (1 - 3 months)',
  'Flexible / Open',
];

// Helper: Status Display info
const getStatusMeta = (status: ProjectSubmission['status']) => {
  switch (status) {
    case 'new':
      return {
        label: 'SUBMITTED',
        color: 'text-[#476800] bg-[#e3fac4] border-[#b9e86a]',
        stepIndex: 1,
        stepName: 'Project Received',
        description: 'Your project brief is received and queued for initial administrative assessment.',
      };
    case 'reviewing':
      return {
        label: 'IN REVIEW',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        stepIndex: 2,
        stepName: 'Technical Feasibility Review',
        description: 'Our engineering team is examining schematics, components, and feasibility specs.',
      };
    case 'contacted':
      return {
        label: 'CONTACTED',
        color: 'text-sky-800 bg-sky-50 border-sky-300',
        stepIndex: 2,
        stepName: 'Consultation & Scope',
        description: 'An engineer has contacted you regarding specifications and schedule.',
      };
    case 'in_progress':
      return {
        label: 'IN PROGRESS',
        color: 'text-white bg-black border-neutral-700',
        stepIndex: 3,
        stepName: 'Hardware / Prototype Execution',
        description: 'Design, schematic routing, firmware development, or fabrication is actively underway.',
      };
    case 'completed':
      return {
        label: 'COMPLETED',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-300',
        stepIndex: 4,
        stepName: 'Delivered & Completed',
        description: 'Design packages, firmware deliverables, or assembled hardware have been completed.',
      };
    case 'rejected':
      return {
        label: 'DECLINED',
        color: 'text-neutral-600 bg-neutral-100 border-neutral-300',
        stepIndex: 0,
        stepName: 'Not Proceeding',
        description: 'This brief cannot be fulfilled under current capacity or technical constraints.',
      };
    default:
      return {
        label: (status || 'UNKNOWN').toUpperCase(),
        color: 'text-neutral-700 bg-neutral-100 border-neutral-300',
        stepIndex: 1,
        stepName: 'Status Pending',
        description: 'Project under review.',
      };
  }
};

export const MyRequestsPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { navigate } = useRouter();

  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Search / filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Edit Modal State
  const [editingProject, setEditingProject] = useState<ProjectSubmission | null>(null);
  const [editForm, setEditForm] = useState<EditFormState>({
    project_name: '',
    project_type: '',
    project_description: '',
    expected_timeline: '',
    phone: '',
    company: '',
    client_name: '',
  });
  const [isSubmittingEdit, setIsSubmittingEdit] = useState<boolean>(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Files modal or state
  // Chat state
        
  const [viewingFilesForId, setViewingFilesForId] = useState<string | null>(null);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  // Fetch current user's submissions
  const fetchMySubmissions = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      // Query by user_id OR email to guarantee matching
      let query = supabase
        .from('project_submissions')
        .select('*');

      if (user.id && user.email) {
        query = query.or(`user_id.eq.${user.id},email.eq.${user.email}`);
      } else if (user.id) {
        query = query.eq('user_id', user.id);
      } else if (user.email) {
        query = query.eq('email', user.email);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmissions(data || []);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to sync your submitted projects.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMySubmissions();
    }
  }, [user, fetchMySubmissions]);

  // Fetch files for a project
  const openFilesModal = async (submissionId: string) => {
    setViewingFilesForId(submissionId);
    setLoadingFiles(true);
    try {
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('submission_id', submissionId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setProjectFiles(data as ProjectFile[]);
      } else {
        setProjectFiles([]);
      }
    } catch {
      setProjectFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  };

  const closeFilesModal = () => {
    setViewingFilesForId(null);
    setProjectFiles([]);
  };

  
  // Open Edit Modal
  const openEditModal = (project: ProjectSubmission) => {
    setEditingProject(project);
    setEditForm({
      project_name: project.project_name || '',
      project_type: project.project_type || 'Embedded Systems & Firmware',
      project_description: project.project_description || '',
      expected_timeline: project.expected_timeline || 'Standard (2 - 4 weeks)',
      phone: project.phone || '',
      company: project.company || '',
      client_name: project.client_name || '',
    });
    setEditError(null);
  };

  const closeEditModal = () => {
    setEditingProject(null);
    setEditError(null);
  };

  // Submit edits
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editForm.project_name.trim()) {
      setEditError('Project name is required.');
      return;
    }
    if (!editForm.project_description.trim()) {
      setEditError('Project description is required.');
      return;
    }

    setIsSubmittingEdit(true);
    setEditError(null);

    try {
      const updates = {
        project_name: editForm.project_name.trim(),
        project_type: editForm.project_type,
        project_description: editForm.project_description.trim(),
        expected_timeline: editForm.expected_timeline || null,
        phone: editForm.phone.trim() || null,
        company: editForm.company.trim() || null,
        client_name: editForm.client_name.trim() || editingProject.client_name,
      };

      const { error } = await supabase
        .from('project_submissions')
        .update(updates)
        .eq('id', editingProject.id);

      if (error) {
        setEditError(`Failed to update project: ${error.message}`);
        setIsSubmittingEdit(false);
        return;
      }

      // Update state in place
      const updatedProject: ProjectSubmission = {
        ...editingProject,
        ...updates,
      };

      setSubmissions((prev) =>
        prev.map((item) => (item.id === editingProject.id ? updatedProject : item))
      );

      setSuccessToast(`Project "${updatedProject.project_name}" updated successfully.`);
      setTimeout(() => setSuccessToast(null), 5000);
      closeEditModal();
    } catch (err: any) {
      setEditError(err?.message || 'Error occurred while saving project changes.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Filtered project list
  const filteredSubmissions = submissions.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = p.project_name?.toLowerCase().includes(q);
      const matchType = p.project_type?.toLowerCase().includes(q);
      const matchDesc = p.project_description?.toLowerCase().includes(q);
      if (!matchName && !matchType && !matchDesc) return false;
    }
    return true;
  });

  const stats = {
    total: submissions.length,
    inProgress: submissions.filter((s) => s.status === 'in_progress').length,
    underReview: submissions.filter((s) => s.status === 'reviewing' || s.status === 'new' || s.status === 'contacted').length,
    completed: submissions.filter((s) => s.status === 'completed').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f9faf7] flex items-center justify-center font-mono-tech text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          <span>AUTHENTICATING TELEMETRY...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#f9faf7] text-[#191c1b] pb-24">
      {/* Top Banner Header */}
      <div className="border-b border-[#c4c7c7]/40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 bg-[#c8f179] rounded-sm inline-block shadow-[0_0_8px_#c8f179]" />
                <span className="font-mono-tech text-xs font-bold tracking-wider text-[#476800] uppercase">
                  CLIENT PORTAL // PROJECT TELEMETRY
                </span>
              </div>
              <h1 className="font-display-tech text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
                My Project Requests
              </h1>
              <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
                Track live engineering progress updated by our team, view status milestones, or modify your submitted technical specifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchMySubmissions}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#c4c7c7] bg-white font-mono-tech text-xs font-bold hover:border-black transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                title="Refresh project status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>REFRESH STATUS</span>
              </button>

              <button
                onClick={() => navigate('/order')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-mono-tech text-xs font-bold transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c8f179]" />
                <span>REQUEST NEW PROJECT</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#c4c7c7]/30">
            <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-4">
              <span className="font-mono-tech text-[10px] text-neutral-500 font-bold block uppercase tracking-wider">
                Total Requests
              </span>
              <div className="text-2xl font-black text-black mt-1 font-display-tech">
                {stats.total}
              </div>
            </div>

            <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-4">
              <span className="font-mono-tech text-[10px] text-amber-700 font-bold block uppercase tracking-wider">
                Under Review
              </span>
              <div className="text-2xl font-black text-amber-700 mt-1 font-display-tech">
                {stats.underReview}
              </div>
            </div>

            <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-4">
              <span className="font-mono-tech text-[10px] text-[#476800] font-bold block uppercase tracking-wider">
                In Active Engineering
              </span>
              <div className="text-2xl font-black text-[#476800] mt-1 font-display-tech">
                {stats.inProgress}
              </div>
            </div>

            <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-4">
              <span className="font-mono-tech text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">
                Completed
              </span>
              <div className="text-2xl font-black text-emerald-700 mt-1 font-display-tech">
                {stats.completed}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 space-y-6">
        {/* Success Toast */}
        {successToast && (
          <div className="p-4 rounded-xl bg-[#e3fac4] border border-[#b9e86a] text-[#2b4000] font-mono-tech text-xs flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#476800] shrink-0" />
              <span className="font-bold">{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-[#476800] hover:text-black cursor-pointer font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-mono-tech text-xs flex items-center gap-2.5 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#c4c7c7]/70 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by project title, technology, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono-tech text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {['ALL', 'new', 'reviewing', 'in_progress', 'completed'].map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => setStatusFilter(statusKey)}
                className={`px-3 py-2 rounded-xl font-mono-tech text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === statusKey
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-[#f9faf7] text-neutral-600 border border-[#c4c7c7]/60 hover:border-black hover:text-black'
                }`}
              >
                {statusKey === 'ALL'
                  ? 'ALL STATUSES'
                  : statusKey === 'new'
                  ? 'SUBMITTED'
                  : statusKey.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project Submissions List */}
        {loading ? (
          <div className="py-24 text-center bg-white border border-[#c4c7c7]/70 rounded-2xl">
            <div className="inline-block w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin mb-3" />
            <p className="font-mono-tech text-xs text-neutral-500 uppercase tracking-wider">
              RETRIEVING YOUR PROJECT SUBMISSIONS...
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-20 px-6 text-center bg-white border border-[#c4c7c7]/70 rounded-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e3fac4] border border-[#b9e86a] text-[#476800] mx-auto flex items-center justify-center">
              <FolderKanban className="w-7 h-7" />
            </div>
            <h3 className="font-display-tech text-xl font-bold text-black">
              {submissions.length === 0
                ? 'No Project Requests Found'
                : 'No Matching Requests'}
            </h3>
            <p className="font-mono-tech text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              {submissions.length === 0
                ? "You haven't initiated any engineering project briefs yet. Submit your hardware or IoT concept to start building."
                : 'No project briefs match your search filter criteria. Try clearing your query.'}
            </p>
            {submissions.length === 0 && (
              <button
                onClick={() => navigate('/order')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white hover:bg-neutral-800 font-mono-tech text-xs font-bold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 mt-2"
              >
                <span>START A NEW PROJECT BRIEF</span>
                <ArrowRight className="w-4 h-4 text-[#c8f179]" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions.map((project) => {
              const meta = getStatusMeta(project.status);
              const progressPercentage =
                project.status === 'completed'
                  ? 100
                  : project.status === 'in_progress'
                  ? 75
                  : project.status === 'reviewing' || project.status === 'contacted'
                  ? 50
                  : 25;

              return (
                <div
                  key={project.id}
                  className="bg-white border border-[#c4c7c7]/80 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Header Row: Title, Date, Status */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#c4c7c7]/30">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`font-mono-tech text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                        <span className="font-mono-tech text-[11px] text-neutral-400 font-medium">
                          REF: #{project.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <span className="font-mono-tech text-[11px] text-neutral-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-400" />
                          {new Date(project.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h2 className="font-display-tech text-2xl sm:text-3xl font-black text-black tracking-tight">
                        {project.project_name}
                      </h2>
                      <div className="font-mono-tech text-xs text-[#476800] font-bold uppercase mt-1">
                        {project.project_type}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        onClick={() => openEditModal(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-black bg-white hover:bg-neutral-50 font-mono-tech text-xs font-bold text-black transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                        title="Edit what you have given in this project"
                      >
                        <FileEdit className="w-3.5 h-3.5 text-[#476800]" />
                        <span>EDIT DETAILS</span>
                      </button>

                      <button
                        onClick={() => openFilesModal(project.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#c4c7c7] bg-[#f9faf7] hover:border-black font-mono-tech text-xs font-bold text-neutral-700 hover:text-black transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                        title="View attached design files and schematics"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>ATTACHMENTS</span>
                      </button>

                      
                    </div>
                  </div>

                  {/* Visual Progress Milestones Tracker (Admin-Driven) */}
                  <div className="py-6 border-b border-[#c4c7c7]/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-tech text-[10px] text-neutral-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#476800] animate-pulse" />
                        ADMIN-UPDATED ENGINEERING PROGRESS: {meta.stepName}
                      </span>
                      <span className="font-mono-tech text-xs font-bold text-black">
                        {progressPercentage}%
                      </span>
                    </div>

                    {/* Progress Bar Line */}
                    <div className="w-full bg-[#edeeeb] rounded-full h-2 overflow-hidden mb-5">
                      <div
                        className="h-full bg-[#476800] transition-all duration-700 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>

                    {/* Milestone Steps */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { num: '01', title: 'Received', desc: 'Brief Submitted', active: progressPercentage >= 25 },
                        { num: '02', title: 'Review', desc: 'Feasibility Specs', active: progressPercentage >= 50 },
                        { num: '03', title: 'Engineering', desc: 'Hardware & Firmware', active: progressPercentage >= 75 },
                        { num: '04', title: 'Complete', desc: 'Deliverables Ready', active: progressPercentage >= 100 },
                      ].map((step, idx) => (
                        <div
                          key={step.num}
                          className={`p-3 rounded-xl border transition-all ${
                            step.active
                              ? 'bg-[#f4fbe9] border-[#b9e86a] text-[#2b4000]'
                              : 'bg-[#f9faf7] border-[#c4c7c7]/40 text-neutral-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono-tech text-[10px] font-bold">
                              PHASE {step.num}
                            </span>
                            {step.active ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#476800]" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-neutral-300" />
                            )}
                          </div>
                          <div className="font-bold text-xs">{step.title}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{step.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-[#f9faf7] border border-[#c4c7c7]/60 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#476800] shrink-0 mt-0.5" />
                      <div className="text-xs text-neutral-600 leading-relaxed font-sans">
                        <strong className="text-black font-semibold">Latest Update: </strong>
                        {meta.description}
                      </div>
                    </div>
                  </div>

                  {/* Summary Details: Description, Timeline, Specs */}
                  <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-2">
                      <span className="font-mono-tech text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                        PROJECT REQUIREMENTS & SPECIFICATION
                      </span>
                      <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap bg-[#f9faf7] p-4 rounded-xl border border-[#c4c7c7]/50 font-sans">
                        {project.project_description || 'No description entered.'}
                      </p>
                    </div>

                    <div className="space-y-3 bg-[#f9faf7] p-4 rounded-xl border border-[#c4c7c7]/50 text-xs">
                      <span className="font-mono-tech text-[10px] text-neutral-400 font-bold uppercase tracking-wider block border-b border-[#c4c7c7]/30 pb-1.5">
                        DELIVERY TELEMETRY
                      </span>

                      <div>
                        <span className="text-neutral-400 text-[10px] block">Expected Timeline:</span>
                        <span className="font-bold text-black">
                          {project.expected_timeline || 'Standard (2 - 4 weeks)'}
                        </span>
                      </div>

                      <div>
                        <span className="text-neutral-400 text-[10px] block">Contact Phone:</span>
                        <span className="font-mono-tech text-neutral-700">
                          {project.phone || 'Not provided'}
                        </span>
                      </div>

                      <div>
                        <span className="text-neutral-400 text-[10px] block">Company / Organization:</span>
                        <span className="font-medium text-neutral-800">
                          {project.company || 'Individual / Independent'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          EDIT PROJECT MODAL
          Allows user to edit what they have submitted in their project brief
         ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#c4c7c7] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-6">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#c4c7c7]/50 flex items-center justify-between bg-[#f9faf7]">
              <div>
                <span className="font-mono-tech text-[10px] text-[#476800] uppercase font-bold tracking-wider block">
                  MODIFY PROJECT SPECIFICATION
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mt-0.5">
                  Edit Request
                </h2>
              </div>
              <button
                onClick={closeEditModal}
                className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1 text-xs">
              {editError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-mono-tech text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{editError}</span>
                </div>
              )}

              {/* Project Name */}
              <div>
                <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.project_name}
                  onChange={(e) => setEditForm({ ...editForm, project_name: e.target.value })}
                  placeholder="e.g. NextGen Telemetry Node"
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl px-4 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                  Engineering Domain / Type *
                </label>
                <select
                  value={editForm.project_type}
                  onChange={(e) => setEditForm({ ...editForm, project_type: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl px-4 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                  Expected Timeline
                </label>
                <select
                  value={editForm.expected_timeline}
                  onChange={(e) => setEditForm({ ...editForm, expected_timeline: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl px-4 py-2.5 text-xs text-black font-semibold focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer"
                >
                  {TIMELINE_OPTIONS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Description */}
              <div>
                <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                  Detailed Specifications & Requirements *
                </label>
                <textarea
                  rows={5}
                  required
                  value={editForm.project_description}
                  onChange={(e) => setEditForm({ ...editForm, project_description: e.target.value })}
                  placeholder="Detail your component specs, power requirements, protocols, and deliverables..."
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl p-4 text-xs text-black font-sans leading-relaxed focus:outline-none focus:border-black focus:bg-white transition-all"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#c4c7c7]/30">
                <div>
                  <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                    Phone Contact
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-[11px] font-bold text-black uppercase block mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                    placeholder="Acme Robotics Ltd"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#c4c7c7]/50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSubmittingEdit}
                  className="px-5 py-2.5 rounded-xl border border-[#c4c7c7] bg-white text-neutral-700 font-mono-tech text-xs font-bold hover:border-black transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEdit}
                  className="px-6 py-2.5 rounded-xl bg-black text-white hover:bg-neutral-800 font-mono-tech text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingEdit ? 'SAVING EDITS...' : 'SAVE CHANGES'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          ATTACHMENTS MODAL
         ========================================================================= */}
      {viewingFilesForId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white border border-[#c4c7c7] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#c4c7c7]/40 pb-3">
              <h3 className="font-display-tech text-lg font-bold text-black">
                Attached Design Files
              </h3>
              <button
                onClick={closeFilesModal}
                className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingFiles ? (
              <div className="py-8 text-center font-mono-tech text-xs text-neutral-500">
                LOADING ATTACHMENTS...
              </div>
            ) : projectFiles.length === 0 ? (
              <div className="py-8 text-center font-mono-tech text-xs text-neutral-500 bg-[#f9faf7] rounded-xl border border-[#c4c7c7]/40">
                No files were attached with this project submission.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {projectFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-[#476800] shrink-0" />
                      <span className="font-mono-tech font-bold text-black truncate">
                        {file.file_name}
                      </span>
                    </div>
                    <span className="font-mono-tech text-[10px] text-neutral-400 shrink-0">
                      {file.file_size ? `${(file.file_size / 1024).toFixed(0)} KB` : 'FILE'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={closeFilesModal}
                className="px-5 py-2 bg-black text-white rounded-xl font-mono-tech text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};
