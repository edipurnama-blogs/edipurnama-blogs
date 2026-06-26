# PRD Website Blog Dai Islami

**Nama Produk:** Website Blog Dai Islami  
**Platform:** Web  
**Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui  
**Backend & Database:** Supabase PostgreSQL  
**Authentication:** Supabase Auth  
**Storage:** Supabase Storage  
**Hosting:** Vercel  
**Tema Warna:** Primary hijau tosca  
**Mode Tampilan:** Light mode saja, tanpa dark mode  
**Target Pengguna:** Remaja hingga dewasa muslim/islami  
**Akses Admin:** Penulis/Admin tunggal atau multi-admin terbatas

---

## 1. Overview Produk

Website ini dibuat sebagai media personal seorang dai yang aktif menulis, berdakwah, dan mendokumentasikan karya-karyanya secara digital. Website berfungsi sebagai landing page publik sekaligus pusat publikasi konten seperti blog harian, artikel keislaman, berita umat, refleksi dakwah, karya buku, dan materi pendukung lainnya.

Website memiliki dua area utama:

1. **Landing Page Publik**  
   Menampilkan profil ringkas dai, daftar tulisan terbaru, blog harian, artikel Islam, berita/seputar umat, karya buku, dan konten unggulan.

2. **Admin Dashboard**  
   Digunakan oleh penulis/admin untuk membuat, mengedit, menyimpan draft, mempublikasikan, mengarsipkan, dan mengelola konten. Dashboard juga mendukung manajemen kategori, tag, SEO meta, gambar, karya buku, serta pengaturan akun seperti username dan password.

---

## 2. Tujuan Produk

Website ini bertujuan untuk:

1. Menjadi pusat dokumentasi karya tulis, pemikiran, dakwah, dan buku seorang dai.
2. Menyediakan media dakwah digital yang rapi, mudah diakses, dan ramah pembaca muda hingga dewasa.
3. Memudahkan admin/penulis dalam menerbitkan konten melalui dashboard terintegrasi.
4. Menampilkan artikel dan berita Islami dengan struktur kategori, tag, pencarian, dan detail halaman yang SEO-friendly.
5. Mendukung publikasi konten secara bertahap melalui status **draft**, **publish**, dan **archived**.
6. Menyediakan fondasi teknis yang mudah dikembangkan menggunakan Next.js, Supabase, dan Vercel.

---

## 3. Target User

### 3.1 Public User / Pembaca

Target pembaca utama adalah:

- Remaja muslim.
- Mahasiswa.
- Aktivis dakwah.
- Jamaah kajian.
- Masyarakat umum yang mencari artikel Islam ringan, reflektif, dan aktual.
- Pembaca yang tertarik pada tulisan dai, opini keislaman, berita umat, dan karya buku.

### 3.2 Admin / Penulis

Admin adalah dai atau tim kecil yang diberi akses untuk:

- Menulis blog harian.
- Membuat artikel Islam.
- Mempublikasikan berita/seputar umat.
- Mengelola karya buku.
- Mengatur kategori dan tag.
- Mengubah profil, username, dan password.
- Mengatur SEO meta setiap konten.

---

## 4. Persona Pengguna

### 4.1 Pembaca Remaja Muslim

**Kebutuhan:** Membaca artikel Islami yang ringan, mudah dipahami, dan relevan dengan kehidupan sehari-hari.  
**Tujuan:** Mendapatkan inspirasi, motivasi, dan wawasan Islam tanpa bahasa yang terlalu berat.  
**Pain Point:** Sulit menemukan tulisan Islami yang rapi, singkat, modern, dan nyaman dibaca di mobile.

### 4.2 Pembaca Dewasa / Jamaah

**Kebutuhan:** Membaca tulisan dakwah, opini, berita umat, dan karya buku dai.  
**Tujuan:** Mengikuti pemikiran dan karya dai secara berkala.  
**Pain Point:** Konten tersebar di media sosial dan sulit ditemukan kembali.

### 4.3 Admin / Dai Penulis

**Kebutuhan:** Menulis, menyimpan draft, mengunggah gambar, mengatur kategori, dan mempublikasikan konten dengan mudah.  
**Tujuan:** Mendokumentasikan karya dakwah secara profesional.  
**Pain Point:** Platform media sosial kurang rapi untuk arsip panjang dan kurang optimal untuk SEO.

---

## 5. Scope Produk

### 5.1 In Scope

Fitur yang termasuk dalam versi awal:

- Landing page publik.
- Halaman profil dai.
- Listing blog harian.
- Listing artikel Islam.
- Listing berita/seputar umat.
- Detail konten/blog/artikel/berita.
- Listing karya buku.
- Detail karya buku.
- Kategori dan tag.
- Search sederhana.
- Featured content.
- Admin login.
- Admin dashboard.
- CRUD konten.
- CRUD kategori.
- CRUD tag.
- CRUD karya buku.
- Upload gambar ke Supabase Storage.
- Status konten: draft, published, archived.
- SEO meta title dan meta description.
- Pengaturan profil admin.
- Pengaturan username.
- Pengaturan password melalui Supabase Auth.
- Responsive design.
- Deployment ke Vercel.

### 5.2 Out of Scope untuk Versi Awal

Fitur berikut tidak wajib pada versi awal, tetapi dapat dikembangkan kemudian:

- Multi-author public profile kompleks.
- Komentar pembaca.
- Newsletter email otomatis.
- Monetisasi.
- Forum diskusi.
- Payment/donasi.
- Integrasi WhatsApp API.
- Push notification.
- Mobile app native.
- Dark mode.

---

## 6. Struktur Halaman Landing Page

### 6.1 Halaman Home `/`

Halaman utama berfungsi sebagai pintu masuk pembaca.

Komponen utama:

1. **Navbar**
   - Logo/nama dai.
   - Menu: Home, Profil, Blog, Artikel Islam, Berita Umat, Karya Buku, Kontak.
   - Search icon.

2. **Hero Section**
   - Foto dai atau ilustrasi dakwah.
   - Headline singkat.
   - Subheadline.
   - CTA: “Baca Tulisan Terbaru” dan “Lihat Karya Buku”.

3. **Ringkasan Profil Dai**
   - Foto.
   - Nama dai.
   - Bio singkat.
   - Fokus dakwah/kajian.
   - Tombol ke halaman profil lengkap.

4. **Tulisan Terbaru**
   - Card konten terbaru dari semua tipe konten published.
   - Menampilkan gambar, kategori, judul, excerpt, tanggal, dan penulis.

5. **Blog Harian**
   - Konten tipe `daily_blog`.
   - Cocok untuk catatan dakwah, refleksi harian, perjalanan, dan pengalaman lapangan.

6. **Artikel Islam**
   - Konten tipe `islamic_article`.
   - Berisi pembahasan akidah, ibadah, akhlak, keluarga, dakwah, sirah, dan motivasi Islam.

7. **Berita dan Seputar Umat**
   - Konten tipe `news`.
   - Berisi kabar kegiatan dakwah, isu umat, kegiatan sosial, pendidikan, dan berita Islami.

8. **Kajian dan Tausiyah Pilihan**
   - Konten tipe `tausiyah` atau kategori kajian.
   - Bisa berupa ringkasan materi kajian, naskah khutbah, atau catatan ceramah.

9. **Karya Buku**
   - Card buku.
   - Menampilkan cover, judul, deskripsi singkat, tahun terbit, dan tombol detail.

10. **Quote / Hikmah Pilihan**
   - Kutipan pendek dari tulisan dai.
   - Dapat diambil dari konten unggulan.

11. **Footer**
   - Profil singkat.
   - Link navigasi.
   - Link sosial media.
   - Kontak.
   - Copyright.

---

### 6.2 Halaman Profil `/profil`

Konten halaman:

- Foto dai.
- Nama lengkap.
- Bio panjang.
- Latar belakang pendidikan/pesantren.
- Fokus dakwah.
- Aktivitas dakwah.
- Karya utama.
- Link sosial media.

---

### 6.3 Halaman Blog Harian `/blog`

Menampilkan daftar konten dengan tipe `daily_blog`.

Fitur:

- Search.
- Filter kategori.
- Filter tag.
- Pagination.
- Card konten.

---

### 6.4 Halaman Artikel Islam `/artikel`

Menampilkan daftar konten dengan tipe `islamic_article`.

Fitur:

- Kategori artikel.
- Tag.
- Artikel populer.
- Artikel terbaru.
- Pagination.

---

### 6.5 Halaman Berita Umat `/berita`

Menampilkan daftar konten dengan tipe `news`.

Fitur:

- Berita terbaru.
- Berita unggulan.
- Kategori berita.
- Pagination.

---

### 6.6 Halaman Kajian / Tausiyah `/kajian`

Menampilkan konten tipe `tausiyah`, `khutbah`, atau ringkasan kajian.

Fitur:

- Daftar kajian.
- Kategori kajian.
- Tag tema.
- Detail materi kajian.

---

### 6.7 Halaman Karya Buku `/karya-buku`

Menampilkan daftar buku/karya.

Card buku menampilkan:

- Cover buku.
- Judul.
- Subjudul.
- Deskripsi singkat.
- Tahun terbit.
- Status publikasi buku: published, draft, atau coming_soon.

---

### 6.8 Halaman Detail Konten `/{contentType}/{slug}`

Contoh URL:

- `/blog/catatan-dakwah-di-pesantren`
- `/artikel/makna-sabar-dalam-islam`
- `/berita/kegiatan-dakwah-ramadhan`
- `/kajian/ringkasan-kajian-akhlak`

Komponen detail:

- Breadcrumb.
- Cover image.
- Kategori.
- Judul.
- Tanggal publish.
- Penulis.
- Reading time.
- Isi konten.
- Tag.
- Share button.
- Artikel terkait.
- SEO meta dinamis.

---

### 6.9 Halaman Pencarian `/search?q=...`

Fitur:

- Search berdasarkan judul, excerpt, dan isi konten.
- Filter tipe konten.
- Menampilkan hasil berupa card.

---

## 7. Struktur Halaman Admin

Base route admin: `/admin`

### 7.1 Login Admin `/admin/login`

Fitur:

- Login menggunakan email dan password Supabase Auth.
- Validasi form.
- Redirect ke dashboard jika berhasil.
- Error message jika login gagal.

Field:

- Email.
- Password.

---

### 7.2 Dashboard `/admin/dashboard`

Menampilkan ringkasan aktivitas konten.

Komponen:

- Total konten.
- Total published.
- Total draft.
- Total archived.
- Total kategori.
- Total tag.
- Total karya buku.
- Konten terbaru.
- Shortcut: tambah blog, tambah artikel, tambah berita, tambah buku.

---

### 7.3 Manajemen Konten `/admin/posts`

Fitur:

- Tabel daftar konten.
- Filter status: draft, published, archived.
- Filter tipe: blog harian, artikel Islam, berita, tausiyah, khutbah.
- Search judul.
- Tombol tambah konten.
- Aksi: view, edit, publish, unpublish/draft, archive, delete.

Kolom tabel:

- Gambar.
- Judul.
- Tipe konten.
- Kategori.
- Status.
- Tanggal publish.
- Penulis.
- Aksi.

---

### 7.4 Tambah/Edit Konten `/admin/posts/new` dan `/admin/posts/[id]/edit`

Field form:

- Judul.
- Slug otomatis/manual.
- Tipe konten.
- Kategori.
- Tag.
- Excerpt.
- Isi konten.
- Cover image.
- Alt text gambar.
- Status: draft, published, archived.
- Featured content.
- Published at.
- SEO title.
- SEO meta description.
- Canonical URL.

Validasi:

- Judul wajib.
- Slug wajib dan unik.
- Tipe konten wajib.
- Status wajib.
- Jika status published, `published_at` otomatis diisi jika kosong.
- Meta description disarankan maksimal 160 karakter.

Editor konten:

- Minimal textarea Markdown.
- Dapat dikembangkan menjadi rich text editor seperti TipTap atau MDX editor.

---

### 7.5 Manajemen Kategori `/admin/categories`

Fitur:

- Tambah kategori.
- Edit kategori.
- Hapus kategori jika tidak digunakan.
- Aktif/nonaktif kategori.

Field:

- Nama kategori.
- Slug.
- Deskripsi.
- Warna label opsional.
- Urutan tampil.
- Status aktif.

---

### 7.6 Manajemen Tag `/admin/tags`

Fitur:

- Tambah tag.
- Edit tag.
- Hapus tag.
- Search tag.

Field:

- Nama tag.
- Slug.

---

### 7.7 Manajemen Karya Buku `/admin/books`

Fitur:

- Tambah buku.
- Edit buku.
- Hapus buku.
- Publish/draft buku.

Field:

- Judul buku.
- Slug.
- Subjudul.
- Deskripsi.
- Cover image.
- Tahun terbit.
- Penerbit.
- ISBN opsional.
- Link pembelian opsional.
- File sample PDF opsional.
- Status: draft, published, coming_soon, archived.
- SEO title.
- SEO meta description.

---

### 7.8 Manajemen Media `/admin/media`

Fitur:

- Upload gambar.
- Melihat daftar gambar.
- Copy URL/path gambar.
- Hapus gambar.

Storage bucket:

- `blog-images`
- `book-covers`
- `avatars`

---

### 7.9 Pengaturan Website `/admin/settings/site`

Fitur:

- Ubah nama website.
- Ubah tagline.
- Ubah deskripsi website.
- Ubah logo.
- Ubah favicon.
- Ubah sosial media.
- Ubah informasi kontak.

---

### 7.10 Pengaturan Akun `/admin/settings/account`

Fitur:

- Ubah nama profil.
- Ubah username.
- Ubah bio.
- Ubah avatar.
- Ubah password.

Catatan teknis:

- Username disimpan di tabel `profiles`.
- Password tidak disimpan di database publik.
- Perubahan password menggunakan Supabase Auth API `updateUser`.

---

## 8. Flow Utama Produk

### 8.1 Flow Membuat Konten Draft

1. Admin login.
2. Admin masuk ke dashboard.
3. Admin memilih menu “Tambah Konten”.
4. Admin mengisi judul, tipe konten, kategori, tag, excerpt, gambar, dan isi konten.
5. Admin memilih status `draft`.
6. Sistem menyimpan konten ke database.
7. Konten tidak muncul di landing page publik.

---

### 8.2 Flow Publish Konten

1. Admin membuka konten draft.
2. Admin melakukan editing.
3. Admin mengubah status menjadi `published`.
4. Sistem mengisi `published_at` jika belum ada.
5. Sistem menyimpan perubahan.
6. Konten muncul di landing page sesuai tipe kontennya.
7. Konten dapat dibuka melalui halaman detail berdasarkan slug.

---

### 8.3 Flow Menampilkan Konten di Landing Page

1. Pembaca membuka landing page.
2. Sistem mengambil data dari tabel `posts` dengan status `published`.
3. Sistem menampilkan card konten berisi:
   - Gambar.
   - Judul.
   - Excerpt.
   - Tanggal.
   - Penulis.
   - Kategori.
4. Pembaca klik card.
5. Sistem membuka halaman detail konten.

---

### 8.4 Flow Upload Gambar

1. Admin memilih file gambar dari form konten.
2. Sistem mengunggah gambar ke Supabase Storage.
3. Supabase mengembalikan path file.
4. Path disimpan di tabel konten.
5. Landing page menggunakan path/URL tersebut untuk menampilkan gambar.

---

### 8.5 Flow Ubah Password Admin

1. Admin membuka pengaturan akun.
2. Admin mengisi password baru.
3. Sistem memanggil Supabase Auth `updateUser`.
4. Jika berhasil, sistem menampilkan notifikasi sukses.
5. Password baru tidak disimpan di tabel publik.

---

## 9. Content Type yang Disarankan

Sistem menggunakan satu tabel konten utama `posts` dengan field `content_type`.

Daftar tipe konten:

| Content Type | Fungsi | Route |
|---|---|---|
| `daily_blog` | Catatan harian dai, refleksi, perjalanan dakwah | `/blog` |
| `islamic_article` | Artikel keislaman tematik | `/artikel` |
| `news` | Berita/seputar umat/kegiatan dakwah | `/berita` |
| `tausiyah` | Ringkasan nasihat, ceramah, kajian | `/kajian` |
| `khutbah` | Naskah khutbah Jumat/Idulfitri/Iduladha | `/khutbah` |
| `opinion` | Opini keumatan dan sosial | `/opini` |
| `story` | Kisah inspiratif, sirah, hikmah | `/kisah` |

---

## 10. UI/UX Requirement

### 10.1 Visual Style

- Tema bersih, Islami, modern, dan ringan.
- Primary color: hijau tosca.
- Tidak menggunakan dark mode.
- Banyak ruang putih agar nyaman dibaca.
- Tipografi besar dan jelas untuk artikel panjang.
- Card konten menggunakan rounded corner dan shadow halus.

### 10.2 Warna Rekomendasi

```txt
Primary: #14B8A6
Primary Hover: #0F766E
Secondary: #ECFDF5
Text: #0F172A
Muted Text: #64748B
Border: #E2E8F0
Background: #FFFFFF
Soft Background: #F8FAFC
Success: #16A34A
Warning: #F59E0B
Danger: #DC2626
```

### 10.3 Komponen shadcn/ui

Komponen yang direkomendasikan:

- Button.
- Card.
- Input.
- Textarea.
- Select.
- Badge.
- Table.
- Dialog.
- Dropdown Menu.
- Tabs.
- Form.
- Toast/Sonner.
- Alert Dialog.
- Avatar.
- Separator.
- Pagination.

---

## 11. SEO Requirement

Setiap konten published harus mendukung:

- Slug unik.
- SEO title.
- Meta description.
- Open Graph title.
- Open Graph description.
- Open Graph image.
- Canonical URL.
- Structured data sederhana untuk artikel.
- Sitemap.
- Robots.txt.

Rekomendasi URL:

```txt
/blog/[slug]
/artikel/[slug]
/berita/[slug]
/kajian/[slug]
/karya-buku/[slug]
```

---

## 12. Functional Requirement

### 12.1 Landing Page

| Kode | Requirement | Prioritas |
|---|---|---|
| LP-001 | User dapat melihat hero section dan profil ringkas dai | Must Have |
| LP-002 | User dapat melihat tulisan terbaru | Must Have |
| LP-003 | User dapat melihat blog harian | Must Have |
| LP-004 | User dapat melihat artikel Islam | Must Have |
| LP-005 | User dapat melihat berita/seputar umat | Must Have |
| LP-006 | User dapat melihat karya buku | Must Have |
| LP-007 | User dapat membuka halaman detail konten | Must Have |
| LP-008 | User dapat melakukan pencarian konten | Should Have |
| LP-009 | User dapat melihat konten terkait | Should Have |
| LP-010 | User dapat share artikel | Should Have |

### 12.2 Admin Dashboard

| Kode | Requirement | Prioritas |
|---|---|---|
| ADM-001 | Admin dapat login | Must Have |
| ADM-002 | Admin dapat melihat dashboard statistik konten | Must Have |
| ADM-003 | Admin dapat membuat konten baru | Must Have |
| ADM-004 | Admin dapat mengedit konten | Must Have |
| ADM-005 | Admin dapat menghapus konten | Must Have |
| ADM-006 | Admin dapat mengubah status draft/published/archived | Must Have |
| ADM-007 | Admin dapat upload cover image | Must Have |
| ADM-008 | Admin dapat mengelola kategori | Must Have |
| ADM-009 | Admin dapat mengelola tag | Must Have |
| ADM-010 | Admin dapat mengelola karya buku | Must Have |
| ADM-011 | Admin dapat mengatur SEO meta | Must Have |
| ADM-012 | Admin dapat mengubah username | Must Have |
| ADM-013 | Admin dapat mengubah password | Must Have |
| ADM-014 | Admin dapat mengubah profil website | Should Have |

---

## 13. Non-Functional Requirement

| Aspek | Requirement |
|---|---|
| Performance | Landing page harus cepat diakses dan gambar dioptimalkan |
| Responsiveness | Website harus nyaman di mobile, tablet, dan desktop |
| Security | Admin route dilindungi autentikasi Supabase |
| Authorization | Hanya admin yang dapat CRUD konten |
| SEO | Konten published harus memiliki meta data dinamis |
| Reliability | Data disimpan di Supabase PostgreSQL dan gambar di Supabase Storage |
| Maintainability | Struktur kode modular dan mudah dikembangkan |
| Accessibility | Kontras warna cukup, alt text gambar, heading rapi |
| Hosting | Deploy di Vercel menggunakan environment variables |

---

## 14. Technical Architecture

### 14.1 Stack

```txt
Frontend:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage

Hosting:
- Vercel
```

### 14.2 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

Catatan:

- `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dapat dipakai di client.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh dipakai di server, jangan pernah expose ke browser.

---

## 15. Rekomendasi Struktur Folder Next.js

```txt
src/
  app/
    (public)/
      page.tsx
      profil/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      artikel/page.tsx
      artikel/[slug]/page.tsx
      berita/page.tsx
      berita/[slug]/page.tsx
      kajian/page.tsx
      kajian/[slug]/page.tsx
      karya-buku/page.tsx
      karya-buku/[slug]/page.tsx
      search/page.tsx
    admin/
      login/page.tsx
      dashboard/page.tsx
      posts/page.tsx
      posts/new/page.tsx
      posts/[id]/edit/page.tsx
      categories/page.tsx
      tags/page.tsx
      books/page.tsx
      media/page.tsx
      settings/
        site/page.tsx
        account/page.tsx
  components/
    public/
    admin/
    ui/
  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    utils.ts
    slugify.ts
  types/
    database.ts
```

---

## 16. Data Model Ringkas

Entitas utama:

1. `profiles`  
   Menyimpan profil admin/penulis yang terhubung dengan Supabase Auth.

2. `site_settings`  
   Menyimpan pengaturan website.

3. `categories`  
   Menyimpan kategori konten.

4. `tags`  
   Menyimpan tag konten.

5. `posts`  
   Menyimpan semua tulisan: blog harian, artikel Islam, berita, tausiyah, khutbah, opini, dan kisah.

6. `post_tags`  
   Relasi many-to-many antara posts dan tags.

7. `books`  
   Menyimpan karya buku.

8. `media_assets`  
   Menyimpan metadata file yang diupload ke Supabase Storage.

9. `post_views`  
   Opsional untuk tracking view konten.

---

## 17. Database Schema SQL Supabase

> Jalankan SQL berikut secara berurutan di Supabase SQL Editor.  
> Supabase Auth sudah tersedia secara default melalui schema `auth`. Tabel `profiles` di bawah ini akan terhubung ke `auth.users`.

### 17.1 SQL Lengkap dan Berurutan

```sql
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

-- Membuat profile otomatis saat user dibuat di Supabase Auth.
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

-- Helper untuk mengecek role admin.
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

-- Mencegah user non-admin mengubah role sendiri.
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
-- Satu tabel untuk semua tulisan.
-- Dibedakan dengan content_type.
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

-- Auto published_at ketika status berubah menjadi published.
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
-- 08. POST TAGS: RELASI MANY-TO-MANY
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
-- Metadata file yang diunggah ke Supabase Storage.
-- File fisik tetap berada di Supabase Storage bucket.
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
-- Untuk tracking view sederhana.
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

-- Function untuk increment view_count.
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
-- Bucket gambar untuk blog, cover buku, dan avatar.
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

-- Public read untuk bucket publik.
create policy "storage_public_read_blog_images"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('blog-images', 'book-covers', 'avatars'));

-- Admin upload file.
create policy "storage_admin_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('blog-images', 'book-covers', 'avatars')
  and public.is_admin(auth.uid())
);

-- Admin update file.
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

-- Admin delete file.
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
-- View untuk kebutuhan search publik.
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
-- Setelah membuat user di Supabase Authentication,
-- ubah email di bawah ini sesuai email admin.
-- Jalankan manual jika diperlukan.
-- =========================================================
-- update public.profiles
-- set role = 'super_admin', username = 'admin'
-- where email = 'admin@emailanda.com';
```

---

## 18. Catatan Implementasi Auth Supabase

### 18.1 Membuat Admin Pertama

Rekomendasi langkah:

1. Buat user admin melalui Supabase Dashboard > Authentication > Users.
2. Pastikan trigger `handle_new_user` membuat data di tabel `profiles`.
3. Jalankan SQL promote admin jika ingin menjadikan user sebagai `super_admin`.
4. Login melalui `/admin/login`.

### 18.2 Ubah Password

Password tidak boleh disimpan di tabel `profiles`. Gunakan Supabase Auth API pada sisi aplikasi.

Contoh konsep:

```ts
await supabase.auth.updateUser({
  password: newPassword,
})
```

### 18.3 Ubah Username

Username disimpan di tabel `profiles`.

Contoh konsep:

```ts
await supabase
  .from('profiles')
  .update({ username: newUsername })
  .eq('id', user.id)
```

---

## 19. Query Data Publik yang Dibutuhkan Frontend

### 19.1 Ambil Tulisan Terbaru

```sql
select *
from public.published_posts_view
order by published_at desc
limit 6;
```

### 19.2 Ambil Blog Harian

```sql
select *
from public.published_posts_view
where content_type = 'daily_blog'
order by published_at desc
limit 6;
```

### 19.3 Ambil Artikel Islam

```sql
select *
from public.published_posts_view
where content_type = 'islamic_article'
order by published_at desc
limit 6;
```

### 19.4 Ambil Berita Umat

```sql
select *
from public.published_posts_view
where content_type = 'news'
order by published_at desc
limit 6;
```

### 19.5 Ambil Detail Konten Berdasarkan Slug

```sql
select *
from public.published_posts_view
where slug = 'contoh-slug-artikel'
limit 1;
```

### 19.6 Search Konten

```sql
select *
from public.published_posts_view
where
  title ilike '%' || 'keyword' || '%'
  or excerpt ilike '%' || 'keyword' || '%'
order by published_at desc;
```

---

## 20. Acceptance Criteria

Website dianggap memenuhi versi awal jika:

1. Pembaca dapat membuka landing page dengan tampilan rapi dan responsive.
2. Pembaca dapat melihat profil ringkas dai.
3. Pembaca dapat melihat daftar blog harian, artikel Islam, berita umat, dan karya buku.
4. Pembaca dapat membuka halaman detail konten.
5. Hanya konten berstatus `published` yang muncul di landing page.
6. Konten `draft` tidak muncul di halaman publik.
7. Admin dapat login menggunakan Supabase Auth.
8. Admin dapat membuat, mengedit, menghapus, dan mempublikasikan konten.
9. Admin dapat mengunggah gambar ke Supabase Storage.
10. Admin dapat mengelola kategori dan tag.
11. Admin dapat mengelola karya buku.
12. Admin dapat mengubah username.
13. Admin dapat mengubah password melalui Supabase Auth.
14. Setiap konten memiliki slug dan SEO meta.
15. Website dapat dideploy ke Vercel.

---

## 21. MVP Prioritas Pengerjaan

### Phase 1 — Foundation

- Setup Next.js TypeScript.
- Setup Tailwind CSS.
- Setup shadcn/ui.
- Setup Supabase client/server.
- Setup database schema.
- Setup Auth Supabase.
- Setup protected route admin.

### Phase 2 — Public Website

- Home page.
- Profil section.
- Listing blog.
- Listing artikel.
- Listing berita.
- Detail konten.
- Karya buku.

### Phase 3 — Admin Dashboard

- Login.
- Dashboard statistik.
- CRUD posts.
- CRUD kategori.
- CRUD tag.
- CRUD karya buku.
- Upload gambar.

### Phase 4 — SEO dan Finishing

- SEO metadata dinamis.
- Sitemap.
- Robots.txt.
- Open Graph image.
- Search.
- Responsive polish.
- Deploy Vercel.

---

## 22. Rekomendasi Komponen Card Konten

Card pada landing page sebaiknya menampilkan:

- Cover image.
- Badge kategori.
- Judul.
- Excerpt maksimal 2–3 baris.
- Tanggal publish.
- Penulis.
- Reading time.
- Tombol/area klik menuju detail.

Contoh struktur data card:

```ts
type PostCard = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content_type: 'daily_blog' | 'islamic_article' | 'news' | 'tausiyah' | 'khutbah' | 'opinion' | 'story'
  cover_image_url: string | null
  published_at: string | null
  author_name: string | null
  category_name: string | null
  reading_time_minutes: number
}
```

---

## 23. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Admin lupa mengisi SEO meta | SEO kurang optimal | Buat auto fallback dari title dan excerpt |
| Gambar terlalu besar | Website lambat | Batasi ukuran upload dan gunakan format WebP |
| Slug duplikat | Detail page error | Validasi slug unik di database dan frontend |
| Draft tampil di publik | Konten belum siap terbaca | Query publik wajib filter `status = 'published'` |
| Service role key bocor | Risiko keamanan tinggi | Simpan hanya di server environment Vercel |
| Role escalation | User menaikkan role sendiri | Gunakan RLS dan trigger prevent role change |

---

## 24. Future Enhancement

Fitur lanjutan yang dapat ditambahkan:

1. Komentar pembaca dengan moderasi.
2. Newsletter email.
3. Jadwal kajian.
4. Halaman download materi PDF.
5. Audio kajian.
6. Video kajian YouTube embed.
7. Statistik pembaca lebih detail.
8. Related posts berbasis tag.
9. Bookmark artikel.
10. Multi-author dengan role permission lebih detail.
11. AI assistant untuk membuat excerpt dan SEO meta.
12. Integrasi WhatsApp untuk kontak kajian.

---

## 25. Ringkasan Keputusan Produk

Website Blog Dai Islami ini menggunakan pendekatan sederhana namun scalable:

- Semua tulisan disimpan dalam satu tabel `posts`.
- Jenis tulisan dibedakan menggunakan `content_type`.
- Status publikasi dikontrol dengan `draft`, `published`, dan `archived`.
- Gambar disimpan di Supabase Storage.
- Database hanya menyimpan path/URL gambar.
- Admin menggunakan Supabase Auth.
- Dashboard admin terintegrasi dengan landing page.
- Frontend menggunakan Next.js, TypeScript, Tailwind, dan shadcn/ui.
- Hosting menggunakan Vercel.

Dengan struktur ini, website dapat dikembangkan cepat untuk kebutuhan awal, tetapi tetap siap diperluas menjadi portal dakwah/berita Islami yang lebih lengkap.
