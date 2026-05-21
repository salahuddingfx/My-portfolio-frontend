"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

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
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "dark";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  /* ===========================================================================
     GSAP SCROLL NAVBAR
  =========================================================================== */

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const setup = async () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const saveData = connection?.saveData ?? false;
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
        className={`fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-all duration-300 ${
          scrolled
            ? "h-[72px] bg-[var(--navbar-bg)] border-b border-[var(--border)] backdrop-blur-xl"
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
                <span className="text-[16px] font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">Developer</span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6">
              <div className={`flex h-11 items-center rounded-full border px-1.5 transition-all duration-300 ${
                scrolled ? "border-[var(--border)] bg-[var(--navbar-btn-bg)]" : "border-transparent bg-transparent"
              }`}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative nav-link ${active ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="absolute inset-0 rounded-full bg-[var(--nav-pill-bg)]"
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
                className="nav-cta group inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-[var(--navbar-btn-border)] bg-[var(--navbar-btn-bg)] px-6 text-[13px] font-medium leading-none text-[var(--foreground)] transition-all duration-300 hover:border-[var(--navbar-btn-hover-border)] hover:bg-[var(--navbar-btn-hover-bg)] hover:-translate-y-[1px]"
              >
                <span className="relative top-[0.5px]">Let&apos;s Talk</span>
                <ArrowUpRight size={15} strokeWidth={2} className="shrink-0 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </Link>

              {/* THEME TOGGLE BUTTON */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--navbar-btn-border)] bg-[var(--navbar-btn-bg)] text-[var(--foreground)] transition-all duration-300 hover:border-[var(--navbar-btn-hover-border)] hover:bg-[var(--navbar-btn-hover-bg)] hover:-translate-y-[1px] cursor-pointer"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </nav>

            {/* MOBILE THEME TOGGLE + HAMBURGER */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--navbar-btn-border)] bg-[var(--navbar-btn-bg)] text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--navbar-btn-hover-bg)] cursor-pointer"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--navbar-btn-border)] bg-[var(--navbar-btn-bg)] text-[var(--muted)] transition-all duration-300 hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--foreground)] cursor-pointer"
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
              className="fixed inset-0 z-[var(--z-overlay)] bg-black/70 backdrop-blur-sm lg:hidden"
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
              className="fixed inset-y-0 right-0 z-[var(--z-overlay)] flex h-full w-full max-w-[360px] flex-col border-l border-[var(--border)] bg-[var(--background)] overflow-hidden lg:hidden"
            >
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-[var(--border)] p-5 h-[72px] mx-2.5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]">
                    <span className="text-sm font-semibold text-white">S</span>
                  </div>
                  <span className="text-[15px] font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>Salah Uddin Kader</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--navbar-btn-bg)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* MOBILE NAV LINKS */}
              <nav className="flex-1 overflow-y-auto flex flex-col gap-1.5 p-5">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                      className="shrink-0"
                    >
                      <Link
                        href={link.href}
                        className={`mobile-nav-link ${active ? "bg-[var(--nav-pill-bg)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--navbar-btn-bg)] hover:text-[var(--foreground)]"}`}
                      >
                        <span>{link.name}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                      </Link>
                    </motion.div>
                  );
                })}
                {/* Spacer to guarantee padding-bottom is respected in overflow scrolling */}
                <div className="h-4 shrink-0" />
              </nav>

              {/* FOOTER CTA */}
              <div className="border-t border-[var(--border)] p-5 shrink-0 flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--navbar-btn-border)] bg-[var(--navbar-btn-bg)] text-[14px] font-medium text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--navbar-btn-hover-bg)]"
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                </Link>
                <p className="text-center text-[11px] text-[var(--muted-soft)] font-mono">
                  {settings?.email || "salauddinkaderappy@gmail.com"}
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