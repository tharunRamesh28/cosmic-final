-- Create a secure RPC function to delete a rejected project.
-- This function uses SECURITY DEFINER to bypass RLS, but strictly enforces 
-- authorization by checking the authenticated user's UUID.

CREATE OR REPLACE FUNCTION public.admin_delete_rejected_project(p_project_id UUID)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_project_status TEXT;
  v_deleted_count INT;
BEGIN
  -- 1. Get the current authenticated user's ID
  v_user_id := auth.uid();
  
  -- 2. Verify authentication
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'NOT_AUTHENTICATED', 'message', 'You must be logged in.');
  END IF;

  -- 3. Verify Admin Authorization (Using the hardcoded admin UUID from the project)
  IF v_user_id != '9163b26d-c7b1-4a13-8688-62ca34233fd9'::UUID THEN
    RETURN json_build_object('success', false, 'error', 'NOT_ADMIN', 'message', 'You are not authorized to delete this project.');
  END IF;

  -- 4. Check if the project exists and get its status
  SELECT status INTO v_project_status 
  FROM public.project_submissions 
  WHERE id = p_project_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'PROJECT_NOT_FOUND', 'message', 'Project could not be found.');
  END IF;

  -- 5. Normalize and verify the status is exactly 'rejected'
  IF LOWER(TRIM(v_project_status)) != 'rejected' THEN
    RETURN json_build_object('success', false, 'error', 'PROJECT_NOT_REJECTED', 'message', 'Only rejected projects can be deleted.');
  END IF;

  -- 6. Perform the exact deletion by primary key
  DELETE FROM public.project_submissions 
  WHERE id = p_project_id;
  
  GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

  -- 7. Verify deletion
  IF v_deleted_count = 0 THEN
    RETURN json_build_object('success', false, 'error', 'DELETE_FAILED', 'message', 'Unable to permanently delete the project.');
  END IF;

  -- 8. Return success
  RETURN json_build_object('success', true, 'error', 'DELETED', 'message', 'Project deleted successfully.');
END;
$$;
