# Wiztr Merch Landing Page Plan

## Tujuan
Merancang ulang landing page `wiztrmerch.com` sebagai aplikasi **Next.js monolitik** dengan fokus pada:

- memperkuat identitas brand WIZTR
- menampilkan hero/banner utama dari aset yang tersedia
- mengarahkan pengunjung ke katalog, produk unggulan, dan CTA pembelian
- menyiapkan fondasi yang rapi untuk pengembangan full website merch

## Material Tersedia
Gunakan aset dari folder [`wiztr image`](/Users/syahriezas/wiztr/wiztr%20image):

- `WIZTR bg.svg`
- `WIZTR text.svg`
- `WIZTR banner depan merah.svg`
- `WIZTR banner.jpg`
- `WIZTR banner depan.psd`
- `WIZTR banner.svg`
- `WIZTR logo.svg`

## Arah Visual

- Nuansa brand: bold, streetwear, modern, energetic
- Dominasi warna: merah, hitam, putih, dan aksen kontras dari aset asli
- Gaya layout: editorial hero, clean product storytelling, CTA jelas
- Hindari tampilan generik ecommerce template

## Scope Landing Page

Halaman utama minimal mencakup:

1. `Navbar`
   - logo WIZTR
   - menu: Home, Collection, About, FAQ
   - CTA tombol: Shop Now

2. `Hero Section`
   - gunakan banner utama sebagai focal point
   - headline brand yang kuat
   - subheadline singkat
   - CTA utama dan sekunder

3. `Featured Collection`
   - 3 sampai 6 kartu koleksi/produk unggulan
   - desain kartu konsisten dengan identitas brand

4. `Brand Story`
   - narasi singkat tentang WIZTR Merch
   - positioning sebagai merch/lifestyle brand

5. `Why Choose Wiztr`
   - 3 atau 4 poin keunggulan
   - misalnya: desain eksklusif, bahan premium, limited drop, style statement

6. `CTA Section`
   - dorongan ke katalog atau pembelian
   - visual tetap kuat dan tidak datar

7. `Footer`
   - logo/wordmark
   - navigasi ringkas
   - sosial media placeholder

## Arsitektur Teknis

- Framework: Next.js
- Monolitik: satu project Next.js untuk frontend dan future API routes
- Styling: boleh gunakan Tailwind CSS agar cepat, tetapi visual harus custom
- Asset handling: semua file dari `wiztr image` dipindahkan/diintegrasikan ke `public/`
- Struktur awal yang disarankan:
  - `app/`
  - `components/landing/`
  - `public/brand/`
  - `styles/` bila diperlukan

## Prompt Implementasi

Gunakan prompt ini sebagai acuan implementasi:

> Bangun landing page baru untuk brand `WIZTR Merch` menggunakan `Next.js monolitik`. Gunakan material visual dari folder `wiztr image` sebagai basis identitas desain. Landing page harus terasa bold, modern, edgy, dan tidak terlihat seperti template ecommerce generik. Buat struktur halaman dengan `Navbar`, `Hero`, `Featured Collection`, `Brand Story`, `Why Choose Wiztr`, `CTA Section`, dan `Footer`. Hero harus memakai aset banner/logo WIZTR sebagai fokus visual utama. Gunakan palet merah, hitam, putih, dengan layout yang kuat di desktop dan tetap rapi di mobile. Siapkan struktur komponen yang bersih dan reusable. Jika data produk belum tersedia, gunakan placeholder yang realistis dan mudah diganti.

## Deliverables Tahap Berikutnya

- bootstrap project Next.js monolitik
- import aset brand ke struktur `public/brand`
- implementasi landing page responsive
- polish visual dan spacing
- basic SEO metadata untuk homepage

## Acceptance Criteria

- terdapat satu landing page homepage yang siap dijalankan di Next.js
- semua section utama tampil lengkap
- aset dari folder `wiztr image` dipakai secara nyata
- tampilan desktop dan mobile sama-sama layak
- struktur project cukup rapi untuk dilanjutkan ke halaman katalog

## Catatan

- File ini adalah plan awal, belum implementasi.
- Setelah plan disetujui, tahap berikutnya adalah membuat project Next.js dan membangun landing page langsung di repo ini.
