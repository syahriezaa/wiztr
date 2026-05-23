"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Pre Order", href: "#preorder" },
  { label: "Catalog", href: "/catalog" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        className="relative z-20 flex items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <Image src="/brand/wiztr-logo.svg" alt="WIZTR logo" width={48} height={48} />
          <div className="space-y-1">
            <p className="font-display text-2xl uppercase leading-none tracking-[0.1em]">WIZTR</p>
            <p className="text-xs uppercase tracking-[0.32em] text-white/60">Official Merch</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.18em] text-white/70 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="/catalog"
            className="hidden lg:inline-flex rounded-full border border-[var(--wiztr-red)] bg-[var(--wiztr-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#f03b34]"
          >
            Full Catalog
          </a>

          {/* Hamburger — below lg */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-4 h-0.5 bg-white" />
          </button>
        </div>
      </motion.header>

      {/* Drawer overlay — below lg */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0a0404] flex flex-col px-8 pt-8 pb-10">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="self-end text-white/60 hover:text-white mb-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Links */}
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg uppercase tracking-[0.24em] text-white/70 hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="/catalog"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full border border-[var(--wiztr-red)] bg-[var(--wiztr-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#f03b34]"
              >
                Full Catalog
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
