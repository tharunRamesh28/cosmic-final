-- ====================================================================
-- COSMIC CIRCUIT - CLEANUP & DELETE FIX
-- ====================================================================

-- 1. DROP CHAT TABLES & CRON JOBS
-- We are removing the messaging feature completely.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    PERFORM cron.unschedule('delete_expired_project_messages');
  END IF;
END $$;

DROP TABLE IF EXISTS public.project_messages CASCADE;

-- 2. FIX PROJECT_SUBMISSIONS RLS DELETE POLICY
-- The previous policy failed because public.admin_users did not exist.
-- We must verify admin authorization using the actual UUID from your frontend.
DROP POLICY IF EXISTS "Admins can delete projects" ON public.project_submissions;

CREATE POLICY "Admins can delete projects"
ON public.project_submissions FOR DELETE TO authenticated
USING (
  -- Replace this UUID with your actual AUTHORIZED_ADMIN_UUID if different
  auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9'
  AND status = 'rejected'
);
