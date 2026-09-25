-- ====================================================================
-- COSMIC CIRCUIT - SUPABASE ARCHITECTURE: MISSING MIGRATIONS & POLICIES
-- ====================================================================
-- NOTE: DO NOT recreate tables or policies you already ran (SQL #1 - #4).
-- Execute the following SQL queries in the Supabase SQL Editor to complete
-- the secure backend architecture for Admin Access, File Storage, and Metadata.

-- --------------------------------------------------------------------
-- 1. ADMIN USERS: RLS SELF-CHECK POLICY
-- Allows authenticated admin user to verify their own membership in public.admin_users
-- --------------------------------------------------------------------
create policy "Admins can view their own record"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

-- --------------------------------------------------------------------
-- 2. PROJECT SUBMISSIONS: ADMIN SELECT & UPDATE POLICIES
-- Only users listed in public.admin_users can read or update submissions
-- --------------------------------------------------------------------
create policy "Admins can view project submissions"
on public.project_submissions
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Admins can update project submissions"
on public.project_submissions
for update
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

-- Users can view their own submitted project briefs
create policy "Users can view their own project submissions"
on public.project_submissions
for select
to authenticated
using (
  auth.uid() = user_id
);

-- Users can update what they have submitted in their project brief
create policy "Users can update their own project submissions"
on public.project_submissions
for update
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);

-- --------------------------------------------------------------------
-- 3. PROJECT FILES METADATA TABLE & POLICIES
-- Tracks file records associated with project submissions
-- --------------------------------------------------------------------
create table if not exists public.project_files (
    id uuid primary key default gen_random_uuid(),
    submission_id uuid not null references public.project_submissions(id) on delete cascade,
    file_name text not null,
    storage_path text not null,
    file_size bigint,
    file_type text,
    created_at timestamptz not null default now()
);

alter table public.project_files enable row level security;

-- Anonymous users submitting projects can insert file metadata
create policy "Anyone can insert project file metadata"
on public.project_files
for insert
to anon
with check (true);

-- Only authorized admins can view file metadata
create policy "Admins can view project file metadata"
on public.project_files
for select
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Users can view their own project file metadata"
on public.project_files
for select
to authenticated
using (
  exists (
    select 1 from public.project_submissions
    where project_submissions.id = project_files.submission_id
    and project_submissions.user_id = auth.uid()
  )
);

-- --------------------------------------------------------------------
-- 4. PRIVATE SUPABASE STORAGE: project-files BUCKET & RLS POLICIES
-- Keeps all uploaded schematics, CAD, and docs private (NO public URLs)
-- --------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false)
on conflict (id) do nothing;

-- Anonymous project submitters can upload into the project-files bucket
create policy "Anyone can upload project files"
on storage.objects
for insert
to anon
with check (bucket_id = 'project-files');

-- Only authorized admins can read / download private files
create policy "Admins can view and download project files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'project-files'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);
