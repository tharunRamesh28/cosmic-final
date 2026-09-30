-- ====================================================================
-- COSMIC CIRCUIT - UPGRADE SCRIPT: PROJECT CHAT & ACCEPT/REJECT WORKFLOW
-- ====================================================================
-- This script leverages your EXISTING 12 columns in project_submissions.
-- We are NOT adding 'accepted_at', 'rejected_at', or 'rejection_reason'.

-- 1. Initialize existing submissions
UPDATE public.project_submissions 
SET status = 'new' 
WHERE status IS NULL OR status = '';

-- 2. Create project_messages table for project-linked chat
CREATE TABLE IF NOT EXISTS public.project_messages (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references public.project_submissions(id) on delete cascade,
    sender_id uuid references auth.users(id) on delete set null,
    sender_role text not null check (sender_role in ('USER', 'ADMIN', 'SYSTEM')),
    message text not null,
    is_read boolean default false,
    created_at timestamptz not null default now(),
    expires_at timestamptz not null default (now() + interval '48 hours')
);

-- Enable RLS on messages
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for project_messages
DROP POLICY IF EXISTS "Admins can view all messages" ON public.project_messages;
CREATE POLICY "Admins can view all messages"
ON public.project_messages FOR SELECT TO authenticated
USING (auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9');

DROP POLICY IF EXISTS "Admins can insert messages" ON public.project_messages;
CREATE POLICY "Admins can insert messages"
ON public.project_messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9');

DROP POLICY IF EXISTS "Admins can update messages (read status)" ON public.project_messages;
CREATE POLICY "Admins can update messages (read status)"
ON public.project_messages FOR UPDATE TO authenticated
USING (auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9')
WITH CHECK (auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9');

DROP POLICY IF EXISTS "Users can view their project messages" ON public.project_messages;
CREATE POLICY "Users can view their project messages"
ON public.project_messages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.project_submissions 
    WHERE project_submissions.id = project_messages.project_id 
    AND project_submissions.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert project messages" ON public.project_messages;
CREATE POLICY "Users can insert project messages"
ON public.project_messages FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.project_submissions 
    WHERE project_submissions.id = project_messages.project_id 
    AND project_submissions.user_id = auth.uid()
    AND project_submissions.status = 'accepted'
  )
);

-- 4. Secure Project Deletion (Only Admins, Only Rejected Projects)
DROP POLICY IF EXISTS "Admins can delete projects" ON public.project_submissions;
CREATE POLICY "Admins can delete projects"
ON public.project_submissions FOR DELETE TO authenticated
USING (
  auth.uid() = '9163b26d-c7b1-4a13-8688-62ca34233fd9'
  AND status = 'rejected'
);

-- 5. 48-Hour Message Cleanup (pg_cron)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    PERFORM cron.schedule(
      'delete_expired_project_messages',
      '0 * * * *',
      'DELETE FROM public.project_messages WHERE expires_at <= NOW();'
    );
  END IF;
END $$;
