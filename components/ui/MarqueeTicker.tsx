"use client";

const brands = [
  "20 BUCK SPIN", "ALLIN MERCH", "ARCHITECTS", "BANDCAMP", "CLOSED CASKET",
  "COLD CUTS", "COUNTERPARTS", "DAZE", "DEATHWISH", "DICKIES",
  "DOWN RIGHT MERCH", "DROP DEAD", "EARACHE RECORDS", "EMP", "EVIL GREED",
  "HEAVYMETAL", "HELLS HEADBANGERS", "HOLYMOUNTAIN", "HORIZON SUPPLY",
  "HOT TOPIC", "IMPERICON", "INDIEMERCH", "JSR DIRECT", "KINGSROAD",
  "LINKIN PARK", "LIQUIDBLUE", "METAL BLADE", "METEOR GEM", "NAPALM RECORD",
  "NIGHT SHIFT", "NOFX MERCH", "OSMOSE", "PLASTICHEAD", "PURE NOISE",
  "RELAPSE RECORD", "REVHQ", "ROCKABILIA", "ROCKOFFTRADE", "SEASON OF MIST",
  "TRIPLE B RECORDS", "WARLORD",
];

const SEPARATOR = <span className="mx-6 text-[var(--wiztr-red)] opacity-60">✦</span>;

function TickerItem({ name }: { name: string }) {
  return (
    <span className="flex items-center whitespace-nowrap">
      <span className="font-display text-sm uppercase tracking-[0.28em] text-white/40 transition group-hover:text-white/60">
        {name}
      </span>
      {SEPARATOR}
    </span>
  );
}

function TickerRow({
  direction,
  speed = "marquee-left",
}: {
  direction?: "left" | "right";
  speed?: string;
}) {
  const cls = direction === "right" ? "marquee-right" : "marquee-left";
  // Duplicate for seamless loop
  const items = [...brands, ...brands];

  return (
    <div className="marquee-container overflow-hidden py-3 group">
      <div className={`flex w-max items-center ${cls}`}>
        {items.map((name, i) => (
          <TickerItem key={i} name={name} />
        ))}
      </div>
    </div>
  );
}

export function MarqueeTicker() {
  return (
    <div className="relative border-y border-white/8 bg-[linear-gradient(180deg,rgba(214,37,30,0.03),rgba(255,255,255,0.01))] py-1 overflow-hidden">
      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--wiztr-red)]/40 to-transparent" />

      <TickerRow direction="left" />
      <TickerRow direction="right" />

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--wiztr-black)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--wiztr-black)] to-transparent z-10" />

      {/* Red accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--wiztr-red)]/40 to-transparent" />
    </div>
  );
}
