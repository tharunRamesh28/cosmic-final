import re

def update_admin_dashboard():
    with open('src/pages/AdminDashboardPage.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add new state variables for Modals
    state_injection = """  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // New Modals State
  const [projectToAccept, setProjectToAccept] = useState<ProjectSubmission | null>(null);
  const [projectToReject, setProjectToReject] = useState<ProjectSubmission | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<ProjectSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);
"""
    content = content.replace("  const [actionMessage, setActionMessage] = useState<string | null>(null);", state_injection)

    # 2. Add action handlers (Accept, Reject, Delete)
    handlers_injection = """  const closeProjectDetails = () => {
    setSelectedProject(null);
    setProjectFiles([]);
    setActionMessage(null);
  };

  // Action Handlers
  const handleAcceptProject = async () => {
    if (!projectToAccept) return;
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('project_submissions')
        .update({ status: 'accepted', accepted_at: new Date().toISOString() })
        .eq('id', projectToAccept.id);
      if (!error) {
        setSubmissions(prev => prev.map(p => p.id === projectToAccept.id ? { ...p, status: 'accepted' as any } : p));
        setProjectToAccept(null);
      } else {
        alert('Failed to accept project: ' + error.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectProject = async () => {
    if (!projectToReject) return;
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('project_submissions')
        .update({ 
          status: 'rejected', 
          rejection_reason: rejectionReason,
          rejected_at: new Date().toISOString()
        })
        .eq('id', projectToReject.id);
      if (!error) {
        setSubmissions(prev => prev.map(p => p.id === projectToReject.id ? { ...p, status: 'rejected' as any, rejection_reason: rejectionReason } as any : p));
        setProjectToReject(null);
        setRejectionReason('');
      } else {
        alert('Failed to reject project: ' + error.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('project_submissions')
        .delete()
        .eq('id', projectToDelete.id);
      if (!error) {
        setSubmissions(prev => prev.filter(p => p.id !== projectToDelete.id));
        setProjectToDelete(null);
      } else {
        alert('Failed to delete project: ' + error.message);
      }
    } finally {
      setActionLoading(false);
    }
  };
"""
    content = content.replace("  const closeProjectDetails = () => {\n    setSelectedProject(null);\n    setProjectFiles([]);\n    setActionMessage(null);\n  };", handlers_injection)

    # 3. Update table actions
    table_action_old = """                                <td className="py-4 px-6 text-right font-mono-tech text-xs font-bold text-black group-hover:underline">
                                  View →
                                </td>"""
    table_action_new = """                                <td className="py-4 px-6 text-right font-mono-tech text-xs font-bold">
                                  <div className="flex items-center justify-end gap-2">
                                    {sub.status === 'new' && (
                                      <>
                                        <button onClick={(e) => { e.stopPropagation(); setProjectToAccept(sub); }} className="px-2 py-1 bg-black text-[#c8f179] rounded hover:bg-neutral-800 transition-colors">ACCEPT</button>
                                        <button onClick={(e) => { e.stopPropagation(); setProjectToReject(sub); }} className="px-2 py-1 border border-[#c4c7c7] text-neutral-600 hover:text-black rounded transition-colors">REJECT</button>
                                      </>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); openProjectDetails(sub); }} className="px-2 py-1 text-black underline">VIEW</button>
                                    <button onClick={(e) => { e.stopPropagation(); setProjectToDelete(sub); }} className="px-2 py-1 text-red-600 hover:text-red-800 rounded transition-colors">DELETE</button>
                                  </div>
                                </td>"""
    content = content.replace(table_action_old, table_action_new)

    # 4. Update Modals at the bottom
    modals_code = """
      {/* =========================================================================
          ACTION MODALS
         ========================================================================= */}
      {projectToAccept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-xl">Accept Project?</h3>
            <p className="text-sm text-neutral-600">This will move "{projectToAccept.project_name}" to ACCEPTED status and enable chat.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setProjectToAccept(null)} disabled={actionLoading} className="px-4 py-2 text-neutral-600 font-bold text-xs">CANCEL</button>
              <button onClick={handleAcceptProject} disabled={actionLoading} className="px-4 py-2 bg-black text-[#c8f179] rounded-lg font-bold text-xs">{actionLoading ? 'ACCEPTING...' : 'ACCEPT PROJECT'}</button>
            </div>
          </div>
        </div>
      )}

      {projectToReject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-xl">Reject Project</h3>
            <p className="text-sm text-neutral-600">Rejecting "{projectToReject.project_name}". Optional reason:</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-[#c4c7c7] rounded-lg p-3 text-sm focus:border-black outline-none"
              rows={3}
              placeholder="e.g., We currently do not support this technology stack..."
            />
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setProjectToReject(null); setRejectionReason(''); }} disabled={actionLoading} className="px-4 py-2 text-neutral-600 font-bold text-xs">CANCEL</button>
              <button onClick={handleRejectProject} disabled={actionLoading} className="px-4 py-2 bg-rose-600 text-white rounded-lg font-bold text-xs">{actionLoading ? 'REJECTING...' : 'REJECT PROJECT'}</button>
            </div>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-xl text-rose-600">Delete Project Permanently?</h3>
            <p className="text-sm text-neutral-600">Are you sure you want to delete "{projectToDelete.project_name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setProjectToDelete(null)} disabled={actionLoading} className="px-4 py-2 text-neutral-600 font-bold text-xs">CANCEL</button>
              <button onClick={handleDeleteProject} disabled={actionLoading} className="px-4 py-2 bg-rose-600 text-white rounded-lg font-bold text-xs">{actionLoading ? 'DELETING...' : 'DELETE PROJECT'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
"""
    content = content.replace("    </div>\n  );\n};\n", modals_code)

    with open('src/pages/AdminDashboardPage.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

update_admin_dashboard()
