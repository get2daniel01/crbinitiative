-- Run this once in Supabase: Dashboard > SQL Editor > New query > paste > Run.

-- 1. Who is an admin ---------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins can read own row" on public.admins;
create policy "admins can read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- 2. Stories -----------------------------------------------------------------
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  story_date date not null default current_date,
  image_url text not null,
  body text not null,
  featured boolean not null default false,   -- true = shown on the Impact page
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists stories_featured_idx on public.stories (featured, story_date desc);

alter table public.stories enable row level security;

drop policy if exists "anyone can read stories" on public.stories;
create policy "anyone can read stories" on public.stories
  for select to anon, authenticated using (true);

drop policy if exists "admins insert stories" on public.stories;
create policy "admins insert stories" on public.stories
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update stories" on public.stories;
create policy "admins update stories" on public.stories
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete stories" on public.stories;
create policy "admins delete stories" on public.stories
  for delete to authenticated using (public.is_admin());

-- Only 6 stories can be shown on the Impact page at a time.
create or replace function public.enforce_max_featured()
returns trigger
language plpgsql
as $$
begin
  if new.featured and (select count(*) from public.stories where featured and id <> new.id) >= 6 then
    raise exception 'Only 6 stories can be shown on the Impact page.';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists stories_max_featured on public.stories;
create trigger stories_max_featured
  before insert or update on public.stories
  for each row execute function public.enforce_max_featured();

-- 3. Picture storage ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('story-images', 'story-images', true)
on conflict (id) do nothing;

drop policy if exists "anyone can view story images" on storage.objects;
create policy "anyone can view story images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'story-images');

drop policy if exists "admins upload story images" on storage.objects;
create policy "admins upload story images" on storage.objects
  for insert to authenticated with check (bucket_id = 'story-images' and public.is_admin());

drop policy if exists "admins update story images" on storage.objects;
create policy "admins update story images" on storage.objects
  for update to authenticated using (bucket_id = 'story-images' and public.is_admin());

drop policy if exists "admins delete story images" on storage.objects;
create policy "admins delete story images" on storage.objects
  for delete to authenticated using (bucket_id = 'story-images' and public.is_admin());

-- 4. Make yourself admin (do this AFTER creating your user in Authentication > Users).
-- Replace the email, then run:
--   insert into public.admins (user_id) select id from auth.users where email = 'you@example.org';
