
-- =========================================================
-- 00. EXTENSIONS
-- =========================================================
create extension if not exists pgcrypto;

-- =========================================================
-- 01. ENUM / STATUS MASTER
-- Jalankan lebih awal karena dipakai oleh tabel berikutnya.
-- =========================================================
do $$ begin
  create type public.app_role as enum ('super_admin', 'admin', 'editor');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.publication_status as enum ('draft', 'published', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.book_status as enum ('draft', 'published', 'coming_soon', 'archived');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_type as enum (
    'daily_blog',
    'islamic_article',
    'news',
    'tausiyah',
    'khutbah',
    'opinion',
    'story'
  );
exception
  when duplicate_object then null;
end $$;

-- =========================================================
-- 02. UTILITY FUNCTION: UPDATED_AT
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- 03. AUTH PROFILE TABLE
-- Supabase Auth menyimpan user di auth.users.
-- Tabel profiles menyimpan data tambahan seperti username, nama, bio, role.
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  username text unique,
  full_name text,
  display_name text,
  bio text,
  avatar_path text,
  avatar_url text,
  role public.app_role not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (
    username is null or username ~ '^[a-zA-Z0-9_\.\-]{3,30}$'
  )
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    username,
    full_name,
    display_name,
    role
  ) values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', new.email),
    'admin'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = user_id
      and p.is_active = true
      and p.role in ('super_admin', 'admin', 'editor')
  );
$$;

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role and not public.is_admin(auth.uid()) then
    raise exception 'You are not allowed to change role';
  end if;
  return new;
end;
$$;

create trigger trg_profiles_prevent_role_escalation
before update on public.profiles
for each row execute function public.prevent_role_escalation();

alter table public.profiles enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_update_own_or_admin"
on public.profiles
for update
to authenticated
using (id = auth.uid() or public.is_admin(auth.uid()))
with check (id = auth.uid() or public.is_admin(auth.uid()));

-- =========================================================
-- 04. SITE SETTINGS
-- =========================================================
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'Blog Dai Islami',
  site_tagline text,
  site_description text,
  logo_path text,
  logo_url text,
  favicon_path text,
  favicon_url text,
  primary_color text not null default '#14B8A6',
  contact_email text,
  contact_phone text,
  whatsapp_url text,
  instagram_url text,
  facebook_url text,
  youtube_url text,
  tiktok_url text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "site_settings_public_read"
on public.site_settings
for select
to anon, authenticated
using (true);

create policy "site_settings_admin_all"
on public.site_settings
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into public.site_settings (
  site_name,
  site_tagline,
  site_description,
  primary_color
) values (
  'Blog Dai Islami',
  'Catatan dakwah, ilmu, dan karya tulis Islami',
  'Website personal dai untuk mendokumentasikan blog harian, artikel Islam, berita umat, kajian, dan karya buku.',
  '#14B8A6'
)
on conflict do nothing;

-- =========================================================
-- 05. CATEGORIES
-- =========================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  color text default '#14B8A6',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create trigger trg_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;

create policy "categories_public_read_active"
on public.categories
for select
to anon, authenticated
using (is_active = true or public.is_admin(auth.uid()));

create policy "categories_admin_all"
on public.categories
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into public.categories (name, slug, description, sort_order) values
  ('Blog Harian', 'blog-harian', 'Catatan harian, pengalaman dakwah, dan refleksi kehidupan.', 1),
  ('Aqidah', 'aqidah', 'Tulisan tentang dasar-dasar keimanan.', 2),
  ('Ibadah', 'ibadah', 'Panduan dan renungan seputar ibadah.', 3),
  ('Akhlak', 'akhlak', 'Tulisan tentang adab, karakter, dan akhlak Islami.', 4),
  ('Keluarga Muslim', 'keluarga-muslim', 'Bahasan keluarga, pendidikan anak, dan rumah tangga Islami.', 5),
  ('Dakwah', 'dakwah', 'Tulisan dan refleksi seputar dakwah.', 6),
  ('Berita Umat', 'berita-umat', 'Kabar kegiatan, isu umat, dan berita Islami.', 7),
  ('Kajian', 'kajian', 'Ringkasan kajian, tausiyah, dan materi ceramah.', 8),
  ('Khutbah', 'khutbah', 'Naskah khutbah dan materi mimbar.', 9),
  ('Kisah Inspiratif', 'kisah-inspiratif', 'Kisah hikmah, sirah, dan inspirasi.', 10)
on conflict (slug) do nothing;

-- =========================================================
-- 06. TAGS
-- =========================================================
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tags_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create trigger trg_tags_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

alter table public.tags enable row level security;

create policy "tags_public_read"
on public.tags
for select
to anon, authenticated
using (true);

create policy "tags_admin_all"
on public.tags
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into public.tags (name, slug) values
  ('Dakwah', 'dakwah'),
  ('Remaja Muslim', 'remaja-muslim'),
  ('Akhlak', 'akhlak'),
  ('Motivasi Islam', 'motivasi-islam'),
  ('Kajian', 'kajian'),
  ('Berita Umat', 'berita-umat')
on conflict (slug) do nothing;

-- =========================================================
-- 07. POSTS / BLOG / ARTIKEL / BERITA
-- =========================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  content_type public.content_type not null default 'daily_blog',
  status public.publication_status not null default 'draft',
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_path text,
  cover_image_url text,
  cover_image_alt text,
  is_featured boolean not null default false,
  reading_time_minutes integer not null default 1,
  view_count bigint not null default 0,
  seo_title text,
  seo_description text,
  og_title text,
  og_description text,
  og_image_path text,
  og_image_url text,
  canonical_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint posts_reading_time_positive check (reading_time_minutes >= 1),
  constraint posts_seo_description_length check (seo_description is null or char_length(seo_description) <= 180)
);

create index if not exists idx_posts_author_id on public.posts(author_id);
create index if not exists idx_posts_category_id on public.posts(category_id);
create index if not exists idx_posts_status on public.posts(status);
create index if not exists idx_posts_content_type on public.posts(content_type);
create index if not exists idx_posts_published_at on public.posts(published_at desc);
create index if not exists idx_posts_featured on public.posts(is_featured) where is_featured = true;

create trigger trg_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create or replace function public.set_published_at()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;

  if new.status <> 'published' then
    new.published_at = null;
  end if;

  return new;
end;
$$;

create trigger trg_posts_set_published_at
before insert or update on public.posts
for each row execute function public.set_published_at();

alter table public.posts enable row level security;

create policy "posts_public_read_published"
on public.posts
for select
to anon, authenticated
using (status = 'published' or public.is_admin(auth.uid()));

create policy "posts_admin_insert"
on public.posts
for insert
to authenticated
with check (public.is_admin(auth.uid()));

create policy "posts_admin_update"
on public.posts
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "posts_admin_delete"
on public.posts
for delete
to authenticated
using (public.is_admin(auth.uid()));

-- =========================================================
-- 08. POST TAGS
-- =========================================================
create table if not exists public.post_tags (
  post_id uuid not null references public.posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, tag_id)
);

create index if not exists idx_post_tags_tag_id on public.post_tags(tag_id);

alter table public.post_tags enable row level security;

create policy "post_tags_public_read"
on public.post_tags
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.posts p
    where p.id = post_id
      and (p.status = 'published' or public.is_admin(auth.uid()))
  )
);

create policy "post_tags_admin_all"
on public.post_tags
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- =========================================================
-- 09. BOOKS / KARYA BUKU
-- =========================================================
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  subtitle text,
  description text,
  cover_image_path text,
  cover_image_url text,
  cover_image_alt text,
  publisher text,
  published_year integer,
  isbn text,
  purchase_url text,
  sample_file_path text,
  sample_file_url text,
  status public.book_status not null default 'draft',
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint books_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint books_year_valid check (published_year is null or published_year between 1900 and 2100),
  constraint books_seo_description_length check (seo_description is null or char_length(seo_description) <= 180)
);

create index if not exists idx_books_status on public.books(status);
create index if not exists idx_books_author_id on public.books(author_id);
create index if not exists idx_books_sort_order on public.books(sort_order);

create trigger trg_books_updated_at
before update on public.books
for each row execute function public.set_updated_at();

alter table public.books enable row level security;

create policy "books_public_read_published"
on public.books
for select
to anon, authenticated
using (status in ('published', 'coming_soon') or public.is_admin(auth.uid()));

create policy "books_admin_all"
on public.books
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- =========================================================
-- 10. MEDIA ASSETS
-- =========================================================
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  uploader_id uuid references public.profiles(id) on delete set null,
  bucket_name text not null,
  file_path text not null,
  public_url text,
  file_name text,
  mime_type text,
  size_bytes bigint,
  alt_text text,
  caption text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket_name, file_path)
);

create index if not exists idx_media_assets_bucket on public.media_assets(bucket_name);
create index if not exists idx_media_assets_uploader on public.media_assets(uploader_id);

create trigger trg_media_assets_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

alter table public.media_assets enable row level security;

create policy "media_assets_public_read"
on public.media_assets
for select
to anon, authenticated
using (true);

create policy "media_assets_admin_all"
on public.media_assets
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- =========================================================
-- 11. POST VIEWS OPSIONAL
-- =========================================================
create table if not exists public.post_views (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  viewer_ip_hash text,
  user_agent text,
  viewed_at timestamptz not null default now()
);

create index if not exists idx_post_views_post_id on public.post_views(post_id);
create index if not exists idx_post_views_viewed_at on public.post_views(viewed_at desc);

alter table public.post_views enable row level security;

create policy "post_views_admin_read"
on public.post_views
for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "post_views_public_insert"
on public.post_views
for insert
to anon, authenticated
with check (true);

create or replace function public.increment_post_view(post_uuid uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.posts
  set view_count = view_count + 1
  where id = post_uuid
    and status = 'published';
end;
$$;

-- =========================================================
-- 12. STORAGE BUCKETS
-- =========================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'blog-images',
    'blog-images',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'book-covers',
    'book-covers',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'avatars',
    'avatars',
    true,
    2097152,
    array['image/jpeg', 'image/png', 'image/webp']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "storage_public_read_blog_images"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('blog-images', 'book-covers', 'avatars'));

create policy "storage_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('blog-images', 'book-covers', 'avatars')
  and public.is_admin(auth.uid())
);

create policy "storage_admin_update"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('blog-images', 'book-covers', 'avatars')
  and public.is_admin(auth.uid())
)
with check (
  bucket_id in ('blog-images', 'book-covers', 'avatars')
  and public.is_admin(auth.uid())
);

create policy "storage_admin_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('blog-images', 'book-covers', 'avatars')
  and public.is_admin(auth.uid())
);

-- =========================================================
-- 13. SEARCH HELPER VIEW
-- =========================================================
create or replace view public.published_posts_view as
select
  p.id,
  p.title,
  p.slug,
  p.excerpt,
  p.content_type,
  p.cover_image_url,
  p.cover_image_path,
  p.published_at,
  p.reading_time_minutes,
  p.view_count,
  p.is_featured,
  c.name as category_name,
  c.slug as category_slug,
  pr.display_name as author_name,
  pr.username as author_username
from public.posts p
left join public.categories c on c.id = p.category_id
left join public.profiles pr on pr.id = p.author_id
where p.status = 'published';

-- =========================================================
-- 14. CONTOH PROMOTE ADMIN
-- =========================================================
-- update public.profiles
-- set role = 'super_admin', username = 'admin'
-- where email = 'admin@emailanda.com';

-- =========================================================
-- 15. API GRANTS
-- Supabase API roles still need SQL privileges. RLS policies above
-- decide row-level access after these grants allow table access.
-- =========================================================
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant all privileges on all tables in schema public to service_role;

grant usage, select on all sequences in schema public to anon, authenticated;
grant all privileges on all sequences in schema public to service_role;

grant execute on all functions in schema public to anon, authenticated, service_role;

grant select on public.published_posts_view to anon, authenticated, service_role;

alter default privileges in schema public
grant select, insert, update, delete on tables to anon, authenticated;

alter default privileges in schema public
grant all privileges on tables to service_role;

alter default privileges in schema public
grant usage, select on sequences to anon, authenticated;

alter default privileges in schema public
grant all privileges on sequences to service_role;

alter default privileges in schema public
grant execute on functions to anon, authenticated, service_role;
