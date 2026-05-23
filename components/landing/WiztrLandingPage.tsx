import Image from "next/image";
import { Navbar } from "./Navbar";
import { PreOrderFlow } from "./PreOrderFlow";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import {
  LiveBadge,
  HeroHeadline,
  HeroSubtext,
  HeroCTAs,
  HeroStats,
  HeroRightPanel,
  ScrollIndicator,
  AnimatedStat,
  MagneticButton,
} from "@/components/ui/HeroAnimations";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

interface DisplayItem {
  name: string;
  category: string;
  detail: string;
  accent: string;
  image?: string;
}

const featuredItems: DisplayItem[] = [
  {
    name: "Band Tee Import",
    category: "Ready Stock",
    detail: "Kaos band original langsung dari label & official store luar negeri. 100% authentic, bukan KW.",
    accent: "Tersedia sekarang",
  },
  {
    name: "Hoodie Official Merch",
    category: "Pre-Order",
    detail: "Hoodie heavyweight dari brand-brand merch resmi seperti Hot Topic, EMP, Impericon & lainnya.",
    accent: "Buka pre-order",
  },
  {
    name: "Vinyl & Accessories",
    category: "Import Rare",
    detail: "Vinyl, patch, pin, dan aksesoris eksklusif yang sulit ditemukan di pasar lokal Indonesia.",
    accent: "Request ke admin",
  },
];

const sellingPoints = [
  "40+ Worldwide Website & Label Record — akses ke ratusan official store dan label rekaman dunia.",
  "100% Authentic & Original — langsung dari official store, bukan KW.",
  "Proses Pre-Order yang praktis via WhatsApp — pilih item, kirim link, kami urus sisanya.",
  "Worldwide shipping — kami tangani pengiriman dari luar negeri langsung ke pintumu.",
];

const buyChannels = [
  {
    name: "Shopee",
    label: "Shop on Shopee",
    tag: "Sale up to 50%",
    href: "https://linktr.ee/wiztr.merch",
    color: "#EE4D2D",
    cta: "Shop Now",
  },
  {
    name: "Tokopedia",
    label: "Shop on Tokopedia",
    tag: "Official Store",
    href: "https://www.tokopedia.com/wiztr/product",
    color: "#00AA5B",
    cta: "Shop Now",
  },
  {
    name: "WhatsApp",
    label: "Admin 1 — Info & Order",
    tag: "+62 898-002-5000",
    href: "https://api.whatsapp.com/send/?phone=%2B628980025000",
    color: "#25D366",
    cta: "Chat Now",
  },
  {
    name: "WhatsApp",
    label: "Admin 2 — PO & Wholesale",
    tag: "+62 896-120-5232",
    href: "https://api.whatsapp.com/send/?phone=%2B6289601205232",
    color: "#25D366",
    cta: "Chat Now",
  },
  {
    name: "Instagram",
    label: "Follow on Instagram",
    tag: "@wiz.tr",
    href: "https://www.instagram.com/wiz.tr/",
    color: "#E1306C",
    cta: "Follow",
  },
  {
    name: "TikTok",
    label: "Follow on TikTok",
    tag: "@wiztrmerch",
    href: "https://www.tiktok.com/@wiztrmerch",
    color: "#ffffff",
    cta: "Follow",
  },
  {
    name: "Facebook",
    label: "Follow on Facebook",
    tag: "wiz.tr.27",
    href: "https://www.facebook.com/wiz.tr.27",
    color: "#1877F2",
    cta: "Follow",
  },
];

const faqs = [
  {
    question: "Apakah merch yang dijual 100% original?",
    answer: "Ya, 100% original dan authentic. WIZTR hanya mengimport langsung dari official store, label rekaman resmi, atau distributor resmi band / brand tersebut.",
  },
  {
    question: "Bagaimana cara melakukan pre-order?",
    answer: "Cukup pilih website dari list kami, klik 'View Site' untuk browse koleksi resminya, lalu copy link produk yang kamu mau. Setelah itu klik 'Order' dan hubungi admin via WhatsApp dengan link produk tersebut. Admin akan konfirmasi ketersediaan, estimasi harga total (termasuk shipping), dan detail pembayaran.",
  },
  {
    question: "Berapa lama proses pengiriman?",
    answer: "Estimasi waktu bervariasi tergantung website dan negara asal. Umumnya 4–6 minggu setelah pembayaran konfirmasi. Admin akan memberikan update tracking secara berkala.",
  },
  {
    question: "Band, Label Record, Website apa saja yang tersedia?",
    answer: "WIZTR memiliki akses ke 40+ official store dan label rekaman global seperti Hot Topic, EMP, Impericon, Relapse Records, Season of Mist, Deathwish Inc, dan masih banyak lagi. Jika brand yang kamu cari belum ada di list, kamu bisa request langsung ke admin.",
  },
  {
    question: "Apakah bisa request band atau produk yang tidak ada di list?",
    answer: "Bisa! WIZTR menerima custom request untuk band atau toko yang belum ada di list. Hubungi admin via WhatsApp dan tim kami akan coba carikan akses ke brand tersebut.",
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--wiztr-red)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl uppercase leading-none text-white sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-white/72 sm:text-lg">{description}</p>
    </div>
  );
}

import type { CatalogItem } from "@/lib/catalog";

export function WiztrLandingPage({
  items,
  mainBannerUrl = "/brand/wiztr-banner.svg",
  mainBackgroundUrl = "/brand/wiztr-bg.svg",
  waAdmin1,
  waAdmin2,
}: {
  items?: CatalogItem[],
  mainBannerUrl?: string,
  mainBackgroundUrl?: string,
  waAdmin1?: string,
  waAdmin2?: string,
}) {
  const displayItems = items && items.length > 0 
    ? items.slice(0, 3).map(i => ({
        name: i.name,
        category: i.category,
        detail: i.description,
        accent: "Lihat di Katalog",
        image: i.image
      }))
    : featuredItems;

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--wiztr-black)] text-white">
      <section
        id="home"
        className="relative isolate h-screen overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(214,37,30,0.45),_transparent_32%),linear-gradient(135deg,_#080808_0%,_#121212_55%,_#190606_100%)] grain-overlay"
      >
        <div className="absolute inset-0">
          <Image
            src={mainBackgroundUrl}
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-x-0 top-[72px] bottom-0 z-0 overflow-hidden">
          <Image
            src={mainBannerUrl}
            alt="Main Banner"
            fill
            className="object-cover object-center opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,4,4,0)_0%,rgba(4,4,4,0.1)_30%,rgba(4,4,4,0.35)_50%,rgba(4,4,4,0.6)_65%,rgba(4,4,4,0.7)_78%,rgba(4,4,4,0.7)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,5,0.35)_0%,rgba(8,5,5,0.05)_20%,rgba(8,5,5,0.05)_70%,rgba(8,5,5,0.35)_100%)]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10 mx-auto flex h-screen w-full max-w-7xl flex-col px-6 pb-6 pt-5 sm:px-8 lg:px-10">
          <Navbar />

          <div className="relative z-10 grid flex-1 gap-8 py-4 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative z-10 space-y-5">
              {/* Badge */}
              <LiveBadge>Import Merch Band — Official &amp; Original</LiveBadge>

              {/* Headline */}
              <div className="space-y-4">
                <HeroHeadline text="Merch band import original, sampai ke tanganmu." />
                <HeroSubtext>
                  WIZTR menghadirkan merchandise resmi dari ratusan band &amp; label rekaman dunia langsung ke Indonesia — 100% original, bukan KW.
                </HeroSubtext>
              </div>

              {/* CTAs */}
              <HeroCTAs>
                <MagneticButton
                  href="#preorder"
                  className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wiztr-black)] transition hover:bg-[var(--wiztr-cream)]"
                >
                  Pre-Order Sekarang
                </MagneticButton>
                <a
                  href="#buy"
                  className="rounded-full border border-white/20 px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-white/50 hover:text-white hover:bg-white/6"
                >
                  Cara Beli
                </a>
              </HeroCTAs>

              {/* Stats */}
              <HeroStats>
                <AnimatedStat value={40} suffix="+" label="Official stores & labels" delay={0} />
                <AnimatedStat value={100} suffix="%" label="Original & authentic merch" delay={0.1} />
                <AnimatedStat value={0} staticValue="IDN" label="Pengiriman ke seluruh Indonesia" delay={0.2} />
              </HeroStats>
            </div>

            {/* Right panel — desktop only */}
            <div className="relative hidden lg:block self-stretch">
              <HeroRightPanel>
              <div className="absolute right-0 top-0 h-full w-[72%] flex flex-col justify-between bg-[rgba(5,5,5,0.7)] px-8 py-8 xl:px-10">
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/35">
                    WIZTR Merch Store
                  </p>
                  <p className="mt-5 font-display text-[4rem] uppercase leading-[0.84] text-white xl:text-[4.8rem]">
                    Import
                    <br />
                    Band
                    <br />
                    Merch
                  </p>
                </div>

                <div>
                  <p className="font-display text-[1.6rem] uppercase leading-[0.9] text-white xl:text-[1.9rem]">
                    Pilih brand,
                    <br />
                    kirim link,
                    <br />
                    kami urus import.
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-display text-base leading-none text-white xl:text-lg">
                      wiztrmerch.com
                    </p>
                    <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-white/45 leading-4 max-w-[13rem]">
                      Malang, East Java — Melayani seluruh Indonesia
                    </p>
                  </div>
                </div>
              </div>
              </HeroRightPanel>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="relative z-10 flex justify-center pb-4">
            <ScrollIndicator />
          </div>
        </div>
      </section>

      <MarqueeTicker />

      {/* Where to Buy */}
      <section id="buy" className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(214,37,30,0.06),rgba(255,255,255,0.02))]">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
          <ScrollReveal variant="fadeUp">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--wiztr-red)]">Purchase Channels</p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none text-white sm:text-5xl">Where to Buy</h2>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
            {buyChannels.map((ch, i) => (
              <StaggerItem key={i}>
                <a
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] block"
                >
                  {/* Glow */}
                  <div
                    className="absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl opacity-20 transition group-hover:opacity-40"
                    style={{ backgroundColor: ch.color }}
                  />
                  <div className="relative">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90"
                      style={{ backgroundColor: `${ch.color}28`, border: `1px solid ${ch.color}50` }}
                    >
                      {ch.name}
                    </span>
                    <p className="mt-4 font-display text-xl uppercase leading-tight text-white">{ch.label}</p>
                    <p className="mt-2 text-sm text-white/50">{ch.tag}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40 transition group-hover:text-white/70">
                      {ch.cta} →
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <PreOrderFlow waAdmin1={waAdmin1} waAdmin2={waAdmin2} />

      <section id="collection" className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            eyebrow="Featured Collection"
            title="Pilihan merch terbaik, langsung dari tangan pertama."
            description="Dari kaos band klasik hingga hoodie heavyweight resmi — semua produk WIZTR diimport langsung dari official store dan label rekaman dunia. 100% original, bukan KW."
          />
        </ScrollReveal>

        <StaggerReveal className="mt-12 grid gap-6 lg:grid-cols-3" staggerDelay={0.12}>
          {displayItems.map((item, index) => (
            <StaggerItem key={item.name} variant="scaleUp">
              <article
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.015))] p-6 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--wiztr-red)]/20 blur-3xl transition group-hover:bg-[var(--wiztr-red)]/35" />
                <div className="relative flex min-h-[23rem] flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                      {item.category}
                    </span>
                    <span className="font-display text-5xl text-white/15">0{index + 1}</span>
                  </div>
                  <div className="mt-8 overflow-hidden rounded-[1.4rem] border border-white/8 bg-black/30 p-4">
                    <Image
                      src={item.image || (index === 1 ? "/brand/wiztr-banner-front-red.svg" : "/brand/wiztr-banner.svg")}
                      alt={item.name}
                      width={3556}
                      height={2000}
                      className="h-52 w-full object-cover object-center saturate-125 transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-auto pt-6">
                    <h3 className="font-display text-3xl uppercase text-white">{item.name}</h3>
                    <p className="mt-3 text-base leading-7 text-white/70">{item.detail}</p>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wiztr-red)]">
                      {item.accent}
                    </p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="mt-12 flex justify-center">
            <a href="/catalog" className="rounded-full border border-[var(--wiztr-red)] bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wiztr-red)] transition hover:bg-[var(--wiztr-red)] hover:text-white">
              Lihat Katalog Lengkap
            </a>
          </div>
        </ScrollReveal>
      </section>

      <section id="about" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <ScrollReveal variant="slideLeft">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-4 h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(214,37,30,0.18),_transparent_45%)]" />
              <Image
                src="/brand/wiztr-banner.jpg"
                alt="WIZTR showcase"
                width={3556}
                height={2000}
                className="relative h-full min-h-[24rem] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.15}>
            <div className="flex flex-col justify-center gap-10">
              <SectionTitle
                eyebrow="Tentang WIZTR"
                title="Import merch band terpercaya untuk penggemar musik Indonesia."
                description="WIZTR hadir untuk menjembatani kalian dengan merchandise original dari band & label favorit di seluruh dunia. Tidak perlu repot pesan sendiri — kami yang urus dari sourcing hingga pengiriman ke pintumu."
              />

              <StaggerReveal className="grid gap-4 sm:grid-cols-2" staggerDelay={0.1}>
                {sellingPoints.map((point) => (
                  <StaggerItem key={point} variant="scaleUp">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-base leading-7 text-white/72 h-full">
                      {point}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <ScrollReveal variant="fadeUp">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,_rgba(214,37,30,0.92),_rgba(101,8,8,0.95))] p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
                Kenapa WIZTR?
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                Cara paling mudah dapat merch band import di Indonesia.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                Tidak perlu pusing soal kurs dan shipping internasional. Cukup pilih item, temukan barang yang kamu mau, kirimkan linknya ke admin WIZTR — selesai.
              </p>
            </div>

            <StaggerReveal className="grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {[
                "100% Authentic & Original",
                "40+ Worldwide Website & Label Record",
                "Proses Pre-Order yang Praktis via WhatsApp",
                "Worldwide Shipping",
              ].map((item) => (
                <StaggerItem key={item} variant="scaleUp">
                  <div className="flex min-h-32 items-end rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 font-display text-2xl uppercase leading-tight text-white h-full">
                    {item}
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal variant="fadeUp">
        <section className="border-y border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.03),_rgba(255,255,255,0.01))]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--wiztr-red)]">
                Mulai Pre-Order
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                Temukan merch band favoritmu, kami yang importkan.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/72 sm:text-lg">
                Cukup browse dari 40+ official store di list kami, screenshot atau copy link produk yang kamu mau, lalu hubungi admin WIZTR via WhatsApp. Semudah itu.
              </p>
            </div>
            <a
              href="#preorder"
              className="rounded-full border border-white/20 bg-white px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[var(--wiztr-black)] transition hover:bg-[var(--wiztr-cream)]"
            >
              Pre-Order Sekarang
            </a>
          </div>
        </section>
      </ScrollReveal>

      <section id="faq" className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <ScrollReveal variant="fadeUp">
          <SectionTitle
            eyebrow="FAQ"
            title="Pertanyaan yang sering ditanyakan."
            description="Semua yang perlu kamu tahu seputar cara order, ketersediaan produk, dan pengiriman merch import dari WIZTR."
          />
        </ScrollReveal>
        <StaggerReveal className="mt-12 grid gap-4" staggerDelay={0.1}>
          {faqs.map((faq) => (
            <StaggerItem key={faq.question} variant="fadeUp">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-display text-2xl uppercase text-white">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-base leading-7 text-white/70">{faq.answer}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <Image src="/brand/wiztr-logo.svg" alt="WIZTR logo" width={44} height={44} />
            <div>
              <p className="font-display text-2xl uppercase leading-none text-white">WIZTR</p>
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                Official Merch Store
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm uppercase tracking-[0.2em] text-white/58">
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="/catalog" className="transition hover:text-white">
              Catalog
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </div>

          <p className="text-sm text-white/45">
            <a href="https://www.instagram.com/wiz.tr/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white/80">Instagram</a>
            {" / "}
            <a href="https://www.tiktok.com/@wiztrmerch" target="_blank" rel="noopener noreferrer" className="transition hover:text-white/80">TikTok</a>
            {" / "}
            <a href="https://www.facebook.com/wiz.tr.27" target="_blank" rel="noopener noreferrer" className="transition hover:text-white/80">Facebook</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
