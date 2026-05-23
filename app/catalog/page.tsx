import { getAvailableItems } from "@/lib/catalog";
import type { CatalogItem } from "@/lib/catalog";
import Link from "next/link";

export const metadata = {
  title: "Katalog — WIZTR Merch",
  description:
    "Lihat koleksi merchandise eksklusif WIZTR. Streetwear premium, desain bold, limited drop.",
};

function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <div className="catalog-card">
      <div className="catalog-card-img">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="catalog-card-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 4.5v15a1.5 1.5 0 001.5 1.5z" />
            </svg>
          </div>
        )}
        <span className="catalog-badge">{item.category}</span>
      </div>
      <div className="catalog-card-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const items = getAvailableItems();
  const categories = Array.from(new Set(items.map((i) => i.category)));

  const { category: activeCategory } = await searchParams;

  const filteredItems = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : items;

  return (
    <main className="catalog-page">
      {/* Header */}
      <div className="catalog-header">
        <Link href="/" className="catalog-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali
        </Link>
        <div className="catalog-title-group">
          <span className="catalog-eyebrow">— KOLEKSI KAMI —</span>
          <h1>Katalog <span className="text-red">WIZTR</span></h1>
          <p>Merchandise eksklusif dengan desain bold. Limited drop, style statement.</p>
        </div>
      </div>

      {/* Filter pills */}
      {categories.length > 1 && (
        <div className="catalog-filters">
          <Link
            href="/catalog"
            className={`filter-pill ${!activeCategory ? "filter-active" : ""}`}
          >
            Semua
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/catalog?category=${encodeURIComponent(cat)}`}
              className={`filter-pill ${activeCategory === cat ? "filter-active" : ""}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="catalog-empty">
          <p>Belum ada produk tersedia saat ini.</p>
          <p>Pantau terus untuk drop berikutnya!</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredItems.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
