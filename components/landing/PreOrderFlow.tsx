"use client";

import { useState, useMemo } from "react";

const brands = [
  {
    name: "20 BUCK SPIN",
    logoUrl: "https://ugc.production.linktr.ee/cdaa6524-d025-4cc5-8eee-d962d5fa64c7_20-buck-spin.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.20buckspin.com/"
  },
  {
    name: "ALLIN MERCH",
    logoUrl: "https://ugc.production.linktr.ee/tYp0AQ4GTaKK8YeatOza_ALLIN.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://allinmerch.com/"
  },
  {
    name: "ARCHITECTS Official",
    logoUrl: "https://ugc.production.linktr.ee/580e30c4-a34e-44c3-a6ba-252400fd4c32_skyandearth-f86647db-4f5a-4bbe-8bd7-bf4946c757e5.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.architectsofficial.com/"
  },
  {
    name: "BANDCAMP",
    logoUrl: "https://ugc.production.linktr.ee/faf6a052-d086-4294-a172-5879220153b5_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://bandcamp.com/"
  },
  {
    name: "CLOSED CASKET",
    logoUrl: "https://ugc.production.linktr.ee/fd88a853-0a0b-4b46-ac6e-a527262a23a7_cca-logo.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://closedcasketactivities.com/"
  },
  {
    name: "COLD CUTS",
    logoUrl: "https://ugc.production.linktr.ee/aNlt101SIC5altEIxPCi_coldcuts.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.coldcutsmerch.com/"
  },
  {
    name: "COUNTERPARTS Official",
    logoUrl: "https://ugc.production.linktr.ee/714e12cb-6d3a-42d9-9d7f-6f3c45b3fdef_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://heavenletthemdie.com/collections/all"
  },
  {
    name: "DAZE",
    logoUrl: "https://ugc.production.linktr.ee/57954b6f-bf2b-4274-acd5-b26383512c06_hLq0A3-C-400x400.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://daze-style.com/"
  },
  {
    name: "DEATHWISH",
    logoUrl: "https://ugc.production.linktr.ee/834aae5a-448b-4812-83b2-725d91fd7698_communityIcon-qng0m43m13j11.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://deathwishinc.com/"
  },
  {
    name: "DICKIES",
    logoUrl: "https://ugc.production.linktr.ee/gALbRmTpQNWKUEHi3x7t_dickies.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.dickies.com/"
  },
  {
    name: "DOWN RIGHT MERCH",
    logoUrl: "https://ugc.production.linktr.ee/jozwJp82S1u97xzoqSeR_DRM%20logo%20icon.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://downrightmerch.com/"
  },
  {
    name: "DROP DEAD",
    logoUrl: "https://ugc.production.linktr.ee/44b9832f-b07a-4126-bae1-f4c1e11e7470_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://dropdead.world/"
  },
  {
    name: "EARACHE RECORDS",
    logoUrl: "https://ugc.production.linktr.ee/794c398e-3f66-4e39-8a51-5129bd6541a2_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://earache.com/"
  },
  {
    name: "EMP",
    logoUrl: "https://ugc.production.linktr.ee/761038ce-ee68-4e84-af15-21311f0aed8c_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.emp-online.com/"
  },
  {
    name: "EVIL GREED",
    logoUrl: "https://ugc.production.linktr.ee/b0e3a4cb-30ed-47ed-94e8-89d64f819778_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://evilgreed.net/"
  },
  {
    name: "HEAVYMETAL",
    logoUrl: "https://ugc.production.linktr.ee/04420fe0-a45e-465c-9be1-88cf628f0572_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://heavymetalonline.co.uk/"
  },
  {
    name: "HELLS HEADBANGERS",
    logoUrl: "https://ugc.production.linktr.ee/30917bea-4412-448b-b8eb-b82de9318595_channels4-profile.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://shop-hellsheadbangers.com/"
  },
  {
    name: "HOLYMOUNTAIN",
    logoUrl: "https://ugc.production.linktr.ee/95eaee15-1a26-4de8-a1f1-fd46367167e5_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://holymountainprinting.com/"
  },
  {
    name: "HORIZON SUPPLY",
    logoUrl: "https://ugc.production.linktr.ee/a2a13305-148d-4ae6-a50c-3bb30e79a9b8_hexlogo.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.horizonsupply.co/"
  },
  {
    name: "HOT TOPIC",
    logoUrl: "https://ugc.production.linktr.ee/y9R1d0d6T6SIkkSxQJTK_HOTTOPIC.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "http://Hottopic.com"
  },
  {
    name: "IMPERICON",
    logoUrl: "https://ugc.production.linktr.ee/100a63ed-0289-417b-9355-47570edc59b9_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://impericon.com/en"
  },
  {
    name: "INDIEMERCH",
    logoUrl: "https://ugc.production.linktr.ee/a83eac03-1b8a-4c62-a230-254fb45a0f73_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://indiemerchstore.com/"
  },
  {
    name: "JSR DIRECT",
    logoUrl: "https://ugc.production.linktr.ee/d6cd2a3b-1886-4fcd-aaf0-1f22528d14fc_jsr.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://jsrdirect.com/"
  },
  {
    name: "KINGSROAD EU",
    logoUrl: "https://ugc.production.linktr.ee/75e2ba82-64d7-4349-86a1-8a51aebac8ab_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://eu.kingsroadmerch.com/shop/artists/"
  },
  {
    name: "KINGSROAD US",
    logoUrl: "https://ugc.production.linktr.ee/S2kgBojzQvi1JxoTWznu_kingsroadmerch.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://kingsroadmerch.com/artists/"
  },
  {
    name: "LINKIN PARK Official",
    logoUrl: "https://ugc.production.linktr.ee/a4e9e100-f532-493c-8198-b756a86990cd_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://store.linkinpark.com/"
  },
  {
    name: "LIQUIDBLUE",
    logoUrl: "https://ugc.production.linktr.ee/df7d0670-61b8-4f31-b953-d0068c257ac9_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://liquidblue.com/"
  },
  {
    name: "METAL BLADE",
    logoUrl: "https://ugc.production.linktr.ee/dR5Rk3VRGCZs6ET2LHYu_L-264018-1524343115-8713.jpeg.jpg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.metalblade.com/us/"
  },
  {
    name: "METEOR GEM",
    logoUrl: "https://ugc.production.linktr.ee/0a6dae0c-4da6-42c7-a6eb-f9eae22a7342_osmose.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://meteorgem.com/"
  },
  {
    name: "NAPALM RECORD",
    logoUrl: "https://ugc.production.linktr.ee/20a56316-8752-4180-9c40-5aa5512de975_NAPALM-RECORDS.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://napalmrecords.com/deutsch/"
  },
  {
    name: "NIGHT SHIFT MERCH",
    logoUrl: "https://ugc.production.linktr.ee/MtoN4KaTS6KnGBQ6eRs0_nightshift%20logo%20icon.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.nightshiftmerch.com/"
  },
  {
    name: "NOFX MERCH",
    logoUrl: "https://ugc.production.linktr.ee/441ad05d-4a4f-4493-8ea8-540edf42cea4_stickers-nofx-punk-rock-logo.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://eu.nofxmerch.com/"
  },
  {
    name: "OSMOSE PRODUCTIONS",
    logoUrl: "https://ugc.production.linktr.ee/0a6dae0c-4da6-42c7-a6eb-f9eae22a7342_osmose.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.osmoseproductions.com/index.cfm"
  },
  {
    name: "PLASTICHEAD",
    logoUrl: "https://ugc.production.linktr.ee/38e02966-dc46-4e8b-a5a2-5ece597a9a9c_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.plastichead.com/clothing"
  },
  {
    name: "PURE NOISE",
    logoUrl: "https://ugc.production.linktr.ee/l522VU2rS3WQx2H49tSK_pure%20noise%20logo%20icon.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://purenoise.merchnow.com/"
  },
  {
    name: "RELAPSE RECORD",
    logoUrl: "https://ugc.production.linktr.ee/dR5Rk3VRGCZs6ET2LHYu_L-264018-1524343115-8713.jpeg.jpg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://store.relapse.com/"
  },
  {
    name: "REVHQ",
    logoUrl: "https://ugc.production.linktr.ee/ed7d85be-1aa6-4fb4-9b14-b455c0d0842a_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://revhq.com/"
  },
  {
    name: "ROCKABILIA",
    logoUrl: "https://ugc.production.linktr.ee/b27affff-49bd-41f4-8fd8-e500a6c8a995_image.png?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://rockabilia.com/"
  },
  {
    name: "ROCKOFFTRADE",
    logoUrl: "https://ugc.production.linktr.ee/X6DUE16aTW2qSX3Y6X9f_1575306590792.jfif?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.rockofftrade.com/"
  },
  {
    name: "SEASON OF MIST",
    logoUrl: "https://ugc.production.linktr.ee/306ce70b-43a8-4cb0-bbc1-2409c287ffbb_60c2bc90-ad36-4999-b0c8-b37aec454920-logo-season-of-mist-pentacle.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://shop.season-of-mist.com/"
  },
  {
    name: "TRIPLE B RECORDS",
    logoUrl: "https://ugc.production.linktr.ee/43GHwSWRRjaD72WCaCLu_unnamed%20(2).jpg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://triplebrecords.net/"
  },
  {
    name: "WARLORD",
    logoUrl: "https://ugc.production.linktr.ee/002e90e1-b4a1-4f52-9a6a-db1ec5e96fe1_warlord-logo-01.jpeg?io=true&size=thumbnail-stack_v1_0",
    siteUrl: "https://www.warlordclothing.com/mens-all-items/"
  }
];

const WA_ADMIN_1 = "628980025000";
const WA_ADMIN_2 = "6289601205232";

function buildWALink(phone: string, brand: string) {
  const text = encodeURIComponent(
    `Halo Admin WIZTR! 👋\n\nSaya ingin Pre-Order untuk brand:\n*${brand}*\n\nMohon info ketersediaan dan detail pemesanan. Terima kasih!`
  );
  return `https://api.whatsapp.com/send/?phone=%2B${phone}&text=${text}`;
}

export function PreOrderFlow() {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return brands;
    return brands.filter((b) =>
      b.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section
      id="preorder"
      className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(214,37,30,0.04))]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--wiztr-red)]">
            Pre Order
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
            Brand Collection
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-white/55">
            Pilih brand untuk melihat koleksi resminya atau langsung hubungi admin untuk melakukan pre-order produk impianmu.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari brand (contoh: Dickies, Lawless...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-white/12 bg-white/[0.04] py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--wiztr-red)]/50 focus:bg-white/[0.06]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/60"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          {/* ─── Step 1: Brand Grid ─── */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/30">
                Brands List ({filtered.length})
              </p>
            </div>

            <div className="grid max-h-[600px] grid-cols-2 gap-4 overflow-y-auto pr-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-white/5">
              {filtered.length === 0 ? (
                <div className="col-span-full py-16 text-center">
                  <span className="text-4xl opacity-20">🔎</span>
                  <p className="mt-4 text-sm text-white/30">Brand &quot;{query}&quot; tidak ditemukan</p>
                </div>
              ) : (
                filtered.map((brand) => {
                  const isActive = selected === brand.name;
                  return (
                    <div
                      key={brand.name}
                      className={`group relative flex flex-col items-center rounded-[1.5rem] border p-5 transition-all duration-300 ${
                        isActive
                          ? "border-[var(--wiztr-red)] bg-[rgba(214,37,30,0.08)] ring-1 ring-[var(--wiztr-red)]/30"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      {/* Logo Section */}
                      <div className="relative mb-4 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-inner transition group-hover:border-white/30 group-hover:scale-105">
                        {brand.logoUrl ? (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-full w-full object-cover p-1 saturate-[0.8] transition group-hover:saturate-100"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span className="absolute inset-0 flex items-center justify-center text-[0.7rem] font-bold text-white/20 uppercase">
                          {brand.name.slice(0, 2)}
                        </span>
                      </div>
                      
                      <span
                        className={`mb-5 block w-full text-center font-sans text-[0.85rem] font-black uppercase tracking-widest leading-tight transition ${
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {brand.name}
                      </span>

                      {/* Action Buttons */}
                      <div className="mt-auto grid w-full grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={() => setSelected(brand.name)}
                          className={`flex items-center justify-center rounded-lg px-2 py-2 text-[0.62rem] font-black uppercase tracking-tighter transition ${
                            isActive
                              ? "bg-[var(--wiztr-red)] text-white"
                              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          Order →
                        </button>
                        <a
                          href={brand.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-lg bg-white/5 border border-white/10 px-2 py-2 text-[0.62rem] font-black uppercase tracking-tighter text-white/50 transition hover:bg-white/15 hover:text-white hover:border-white/30"
                        >
                          View Site
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Custom Brand Footer */}
            <div className="mt-2 rounded-[1.25rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
              <div className="flex items-center gap-4">
                <span className="text-2xl grayscale opacity-30">📦</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                    Not finding the brand you want?
                  </p>
                  <button
                    onClick={() => setSelected("Other Brand / Custom Request")}
                    className="mt-1 text-sm font-black text-[var(--wiztr-red)] uppercase tracking-tight hover:underline"
                  >
                    Send Custom Request to Admin →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Step 2: WA Panel ─── */}
          <div className="flex flex-col gap-6 lg:pt-12">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
              Order Panel
            </p>

            {!selected ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-white/5 bg-white/[0.01] p-10 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03]">
                  <span className="text-4xl opacity-20">💬</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">
                  Select a brand to start
                </p>
                <p className="mt-3 text-xs text-white/10 leading-relaxed max-w-[200px]">
                  Click the &quot;Order&quot; button on any brand card to prepare your message to our admin.
                </p>
              </div>
            ) : (
              <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-white/15 bg-[#090909] shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-5">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20 text-2xl">
                      💬
                    </div>
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#090909] bg-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[1rem] font-black uppercase tracking-tight text-white leading-none">
                      WIZTR Support
                    </p>
                    <p className="mt-1 text-[0.7rem] font-bold text-[#25D366]/80 uppercase tracking-widest">
                      Admin is Active
                    </p>
                  </div>
                </div>

                {/* Message Context */}
                <div className="bg-black/40 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/20">Message Template</span>
                    <button onClick={() => setSelected(null)} className="text-[0.6rem] font-bold uppercase tracking-widest text-white/40 hover:text-white">Clear</button>
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.06] p-5 shadow-inner">
                    <div className="mb-4 flex items-center gap-2">
                       <span className="h-1.5 w-1.5 rounded-full bg-[var(--wiztr-red)]" />
                       <span className="text-[0.65rem] font-black uppercase tracking-widest text-white/40">Brand Focus</span>
                    </div>
                    <p className="font-sans text-[0.9rem] leading-relaxed text-white/90">
                      Halo Admin WIZTR! 👋 I want to pre-order items from: 
                    </p>
                    <p className="mt-2 inline-block rounded-md bg-[var(--wiztr-red)] px-2 py-0.5 font-sans text-[1.1rem] font-black text-white">
                      {selected}
                    </p>
                    <p className="mt-4 font-sans text-[0.85rem] text-white/50 italic">
                      &quot;Mohon info ketersediaan dan detail pemesanan. Terima kasih!&quot;
                    </p>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="grid gap-3 p-6 pt-2">
                  <a
                    href={buildWALink(WA_ADMIN_1, selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-[#25D366] px-5 py-4 transition hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="text-left">
                      <p className="text-[0.8rem] font-black uppercase tracking-tighter text-black">Contact Admin 1</p>
                      <p className="text-[0.6rem] font-bold text-black/60 uppercase">Info & General Orders</p>
                    </div>
                    <span className="text-xl">👉</span>
                  </a>
                  <a
                    href={buildWALink(WA_ADMIN_2, selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-4 transition hover:bg-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="text-left">
                      <p className="text-[0.8rem] font-black uppercase tracking-tighter text-[#25D366]">Contact Admin 2</p>
                      <p className="text-[0.6rem] font-bold text-[#25D366]/60 uppercase">Bulk & Wholesale</p>
                    </div>
                    <span className="text-xl">👉</span>
                  </a>
                </div>

                <div className="px-6 pb-6 text-center">
                   <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/20">
                     Pilih salah satu admin untuk mengirim link barang
                   </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
