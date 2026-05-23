"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

/* ─── Scroll Indicator ──────────────────────────────────── */
export function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
    >
      <span className="text-[0.55rem] uppercase tracking-[0.32em] text-white/30">
        Scroll
      </span>
      <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/20 pt-1.5">
        <motion.div
          className="h-1.5 w-1 rounded-full bg-white/60"
          animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Live Badge ─────────────────────────────────────────── */
export function LiveBadge({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--wiztr-red)] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--wiztr-red)]" />
      </span>
      {children}
    </motion.div>
  );
}

/* ─── Glitch Headline ────────────────────────────────────── */
export function HeroHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="max-w-2xl font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl lg:text-[5.5rem]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.22em] ${i === 0 ? "glitch" : ""}`}
          data-text={i === 0 ? word : undefined}
          initial={{ opacity: 0, y: 40, rotateX: -25 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.35 + i * 0.08,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "top center" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

/* ─── Hero Subtext ───────────────────────────────────────── */
export function HeroSubtext({ children }: { children: ReactNode }) {
  return (
    <motion.p
      className="max-w-lg text-base leading-7 text-white/65"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
}

/* ─── Magnetic CTA Button ────────────────────────────────── */
export function MagneticButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

/* ─── Hero CTAs ──────────────────────────────────────────── */
export function HeroCTAs({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex flex-col gap-3 sm:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ───────────────────────────────────── */
function useCounter(target: number, duration = 1.4, delay = 0) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = (now - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [started, target, duration, delay]);

  return { value, start: () => setStarted(true) };
}

export function AnimatedStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { value: displayed, start } = useCounter(value, 1.6, 0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          start();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3 + delay, duration: 0.6 }}
    >
      <p className="font-display text-2xl uppercase text-white tabular-nums">
        {displayed}{suffix}
      </p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.15em] text-white/50 leading-4">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Hero Stats wrapper ─────────────────────────────────── */
export function HeroStats({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Right Panel slide in ───────────────────────────────── */
export function HeroRightPanel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
