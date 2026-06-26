# Website Blog Dai Islami

Website blog dai Islami berbasis Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, dan Supabase.

## Development

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Environment Variables

Salin `.env.example` menjadi `.env.local` untuk development lokal.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Untuk Vercel, set variable berikut di Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` dengan domain produksi, contoh `https://domainanda.com`

`SUPABASE_SERVICE_ROLE_KEY` hanya boleh disimpan sebagai server-side environment variable. Jangan commit `.env.local`.

## Validation

```bash
npm run lint
npm run build
```

Build tetap aman tanpa `.env.local`; halaman publik memakai fallback data dummy saat Supabase belum dikonfigurasi.

## Deploy

Deploy direkomendasikan melalui Vercel dengan perintah build bawaan:

```bash
npm run build
```
