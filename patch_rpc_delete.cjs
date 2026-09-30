const fs = require('fs');

const path = 'src/pages/AdminDashboardPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    
    // CRITICAL DEBUG TEST
    console.log("PROJECT ID:\\n" + projectToDelete.id);
    console.log("PROJECT NAME:\\n" + projectToDelete.project_name);
    console.log("PROJECT STATUS:\\n" + projectToDelete.status);

    setActionLoading(true);
    try {
      // Step 3 & 4: Call Secure RPC for deletion
      const { data, error } = await supabase.rpc('admin_delete_rejected_project', {
        p_project_id: projectToDelete.id
      });
      
      if (error) {
        console.error('Supabase RPC Error:', error);
        alert('Unable to permanently delete the project.\\n' + error.message);
      } else {
        // Evaluate RPC response
        if (data.success === true) {
          // Step 6 & 7: Verify deletion by refetching from the real database
          await fetchSubmissions();
          setProjectToDelete(null);
          alert(data.message || 'Project deleted successfully.');
        } else {
          // It failed safely on the backend for a specific reason
          console.warn('Backend rejected deletion:', data.error, data.message);
          alert(data.message || 'Unable to permanently delete the project.');
        }
      }
    } catch (err: any) {
      console.error('Unexpected Delete Error:', err);
      alert('An unexpected error occurred during deletion.');
    } finally {
      setActionLoading(false);
    }
  };`;

const regex = /const handleDeleteProject = async \(\) => \{[\s\S]*?setActionLoading\(false\);\n\s*};\n\s*};/g;

// A robust way to replace just the function is to use string indices
const startStr = 'const handleDeleteProject = async () => {';
const endStr = '  // Status Updater';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replacement + '\n\n\n' + content.substring(endIndex);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully replaced handleDeleteProject');
} else {
  console.log('Could not find bounds for replacement.');
}
