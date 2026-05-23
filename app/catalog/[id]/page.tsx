import { getCatalog } from "@/lib/catalog";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const items = getCatalog().filter((i) => i.available);
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = getCatalog().find((i) => i.id === id && i.available);
  if (!item) return { title: "Produk tidak ditemukan — WIZTR" };
  return {
    title: `${item.name} — WIZTR Merch`,
    description: item.description || `${item.name} tersedia di WIZTR. Import merch band original langsung dari official store.`,
    openGraph: {
      title: `${item.name} — WIZTR Merch`,
      description: item.description || `${item.name} tersedia di WIZTR.`,
      images: item.image ? [{ url: item.image }] : [],
    },
  };
}

const WA_TEXT = (name: string) =>
  encodeURIComponent(`Halo Admin WIZTR! 👋\n\nSaya tertarik dengan produk:\n*${name}*\n\nMohon info ketersediaan dan harga. Terima kasih!`);

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getCatalog().find((i) => i.id === id && i.available);
  if (!item) notFound();

  const waLink1 = `https://api.whatsapp.com/send/?phone=%2B628980025000&text=${WA_TEXT(item.name)}`;
  const waLink2 = `https://api.whatsapp.com/send/?phone=%2B6289601205232&text=${WA_TEXT(item.name)}`;

  return (
    <main className="min-h-screen bg-[var(--wiztr-black)] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Back */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-sm text-white/50 uppercase tracking-[0.1em] hover:text-white transition mb-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Katalog
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Image */}
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] aspect-square flex items-center justify-center">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 4.5v15a1.5 1.5 0 001.5 1.5z" />
                </svg>
                <span className="text-sm uppercase tracking-widest">No Image</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-[var(--wiztr-red)] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white mb-4">
                {item.category}
              </span>
              <h1 className="font-display text-4xl uppercase leading-tight text-white sm:text-5xl">
                {item.name}
              </h1>
              {item.description && (
                <p className="mt-4 text-base leading-7 text-white/65">
                  {item.description}
                </p>
              )}
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <p className="text-sm text-white/70">
                Produk ini tersedia untuk pre-order. Hubungi admin untuk info harga dan ketersediaan.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                Order via WhatsApp
              </p>
              <a
                href={waLink1}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-[#25D366] px-5 py-4 transition hover:bg-[#20bd5a] hover:scale-[1.01]"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-black">Admin 1 — Info & Order</p>
                  <p className="text-xs font-bold text-black/60 uppercase">+62 898-002-5000</p>
                </div>
                <span className="text-xl">👉</span>
              </a>
              <a
                href={waLink2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-4 transition hover:bg-[#25D366]/20 hover:scale-[1.01]"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-[#25D366]">Admin 2 — Wholesale</p>
                  <p className="text-xs font-bold text-[#25D366]/60 uppercase">+62 896-120-5232</p>
                </div>
                <span className="text-xl">👉</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
