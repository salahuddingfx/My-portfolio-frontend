"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

/* =============================================================================
   NAVIGATION LINKS
============================================================================= */

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

/* =============================================================================
   COMPONENT
============================================================================= */

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ===========================================================================
     GSAP SCROLL NAVBAR
  =========================================================================== */

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const setup = async () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData = navigator.connection?.saveData ?? false;
      if (reduceMotion || saveData) return;

      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const showAnim = gsap
          .from(headerRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.28,
            ease: "power2.out",
          })
          .progress(1);

        ScrollTrigger.create({
          start: "top top",
          end: 99999,
          onUpdate: (self) => {
            setScrolled(self.scroll() > 24);
            if (self.direction === -1 || self.scroll() <= 0) {
              showAnim.play();
            } else {
              showAnim.reverse();
            }
          },
        });
      });
    };

    setup();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  /* ===========================================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  =========================================================================== */

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* ===========================================================================
     CLOSE ON OUTSIDE CLICK
  =========================================================================== */

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* ===========================================================================
     BODY LOCK
  =========================================================================== */

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* =========================================================================
         HEADER
      ========================================================================= */}
      <header
        ref={headerRef}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "h-[72px] bg-[rgba(8,8,8,0.82)] border-b border-white/[0.06] backdrop-blur-xl"
            : "h-[84px] bg-transparent"
        }`}
      >
        <div className="container h-full">
          <div className="flex h-full items-center justify-between">
            {/* LOGO */}
            <Link href="/" aria-label="Homepage" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-white transition-transform duration-300 group-hover:scale-[1.03]">
                <span className="text-[17px] font-semibold" style={{ fontFamily: "var(--font-space-grotesk)" }}>S</span>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[16px] font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">Developer</span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center">
              <div className={`flex h-11 items-center rounded-full border px-1.5 transition-all duration-300 ${
                scrolled ? "border-white/[0.06] bg-white/[0.03]" : "border-transparent bg-transparent"
              }`}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative nav-link ${active ? "text-white" : "text-[var(--muted)] hover:text-white"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute inset-0 rounded-full bg-white/[0.07]"
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA BUTTON */}
              <Link
                href="/contact"
                className="nav-cta gap-2 group ml-3 inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 text-[13px] font-medium leading-none text-white transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:-translate-y-[1px]"
              >
                <span className="relative top-[0.5px]">Let&apos;s Talk</span>
                <ArrowUpRight size={15} strokeWidth={2} className="shrink-0 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </Link>
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[var(--muted)] transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* DRAWER */}
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 z-[120] flex h-full w-full max-w-[360px] flex-col border-l border-white/[0.06] bg-[#0d0d0d] lg:hidden"
            >
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 h-[72px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]">
                    <span className="text-sm font-semibold text-white">S</span>
                  </div>
                  <span className="text-[15px] font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-[var(--muted)] transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* MOBILE NAV LINKS */}
              <nav className="flex flex-col px-4 py-5">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={`mobile-nav-link ${active ? "bg-white/[0.07] text-white" : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-white"}`}
                      >
                        <span>{link.name}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* FOOTER CTA */}
              <div className="mt-auto border-t border-white/[0.06] px-5 py-5">
                <Link
                  href="/contact"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[14px] font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                </Link>
                <p className="mt-4 text-center text-[11px] text-[var(--muted-soft)]">
                  salauddinkaderappy@gmail.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;